import { GithubRepository, Prisma } from "../../generated/prisma/client.js";
import { OctokitClient } from "../lib/octokit.js";
import { prisma } from "../lib/prisma.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { GithubMapper } from "../mappers/github.mapper.js";
import {
  DedupeGithubWebhookDeliveryInput,
  GithubIssueLabel,
  PersistGithubIssueEventInput,
  ProcessGithubWebhookInput,
  UpsertGithubIssueInput,
  UpsertGithubRepositoryInput,
} from "../types/github.js";

async function isDuplicateWebhookDelivery({
  redis,
  deliveryId,
  ttlSeconds = 60 * 60 * 24,
}: DedupeGithubWebhookDeliveryInput): Promise<boolean> {
  const dedupeKey = `github:webhook:delivery:${deliveryId}`;
  const dedupeResult = await redis.set(dedupeKey, "1", "EX", ttlSeconds, "NX");

  return dedupeResult !== "OK";
}

const toNullableJson = (
  value: unknown,
): Prisma.InputJsonValue | Prisma.JsonNullValueInput => {
  if (value === null || value === undefined) {
    return Prisma.JsonNull;
  }

  return value as Prisma.InputJsonValue;
};

async function upsertGithubRepository({
  payload,
}: UpsertGithubRepositoryInput) {
  try {
    const data = GithubMapper.createGithubRepositoryMapper(payload);

    const response = await prisma.githubRepository.upsert({
      where: {
        github_repository_id: data.github_repository_id,
      },
      create: data,
      update: data,
    });

    return response;
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_GITHUB",
      description: "Failed to create github repository",
    });
  }
}

async function upsertGithubIssue({
  payload,
  repositoryId,
}: UpsertGithubIssueInput) {
  if (!payload.issue) {
    return null;
  }

  try {
    const mappedData = GithubMapper.createGithubIssueMapper(
      payload,
      repositoryId,
    );
    const data = {
      ...mappedData,
      labels: mappedData?.labels.map((label?: string) => label ?? "") ?? [],
      assignees: toNullableJson(mappedData.assignees),
    };

    const response = await prisma.githubIssue.upsert({
      where: {
        github_issue_id: data.github_issue_id,
      },
      create: data,
      update: data,
    });

    return response;
  } catch (e) {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_GITHUB",
      description: "Failed to upsert github issue",
    });
  }
}

async function persistGithubIssueEvent({
  payload,
  rawPayload,
  deliveryId,
  eventType,
  signatureValid,
  repositoryId,
  issueId,
}: PersistGithubIssueEventInput) {
  try {
    const mappedData = GithubMapper.createGithubIssueEventMapper({
      payload,
      rawPayload,
      deliveryId,
      eventType,
      signatureValid,
      repositoryId,
      issueId,
      processingStatus: "processed",
      processedAt: new Date(),
    });

    const data = {
      ...mappedData,
      raw_payload: toNullableJson(mappedData.raw_payload),
    };

    const response = await prisma.githubIssueEvent.upsert({
      where: {
        delivery_id: deliveryId,
      },
      create: data,
      update: data,
    });

    return response;
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_GITHUB",
      description: "Failed to persist github issue event",
    });
  }
}

async function labelClaudeOnIssue({
  githubIssueId,
  githubIssueNumber,
  logger,
}: {
  githubIssueId: number;
  githubIssueNumber: number;
  logger: import("fastify").FastifyBaseLogger;
}) {
  logger.info(
    { githubIssueId, githubIssueNumber },
    "Labeling issue with Claude on GitHub",
  );

  try {
    await OctokitClient.client.rest.issues.addLabels({
      owner: process.env.GITHUB_ORG || "",
      repo: process.env.GITHUB_REPO || "",
      issue_number: githubIssueNumber,
      labels: ["claude"],
    });
    logger.info({ githubIssueNumber }, "Applied claude label on GitHub issue");
  } catch (e) {
    logger.error(
      { githubIssueNumber, err: e },
      "Failed to apply claude label on GitHub",
    );
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_GITHUB",
      description: "Failed to label issue on Github with Claude Code",
    });
  }

  try {
    const response = await prisma.githubIssue.update({
      where: {
        github_issue_id: githubIssueId,
      },
      data: {
        labels: {
          push: "claude",
        },
      },
    });
    logger.info({ githubIssueId }, "Updated claude label in database");

    return response;
  } catch (e) {
    logger.error(
      { githubIssueId, err: e },
      "Failed to update claude label in database",
    );
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_GITHUB",
      description: "Failed to update label on database with Claude Code",
    });
  }
}

async function processWebhook({
  payload,
  rawPayload,
  deliveryId,
  eventType,
  signatureValid,
  logger,
}: ProcessGithubWebhookInput) {
  logger.info({ deliveryId, eventType }, "Processing GitHub webhook");

  try {
    const repository = await upsertGithubRepository({ payload });
    logger.info(
      { repositoryId: repository.id, repositoryName: repository.name },
      "Upserted GitHub repository",
    );

    const issue = await upsertGithubIssue({
      payload,
      repositoryId: repository.id,
    });
    if (issue) {
      logger.info(
        { issueId: issue.id, issueNumber: issue.issue_number },
        "Upserted GitHub issue",
      );
    } else {
      logger.debug({ deliveryId }, "No issue in webhook payload");
    }

    const event = await persistGithubIssueEvent({
      payload,
      rawPayload,
      deliveryId,
      eventType,
      signatureValid,
      repositoryId: repository.id,
      issueId: issue?.id,
    });

    logger.info(
      { eventId: event.id, deliveryId },
      "Persisted GitHub issue event",
    );

    return {
      repository,
      issue,
      event,
    };
  } catch (e) {
    logger.error(
      { deliveryId, eventType, err: e },
      "Failed to process GitHub webhook",
    );
    throw e;
  }
}

export const GithubService = {
  isDuplicateWebhookDelivery,
  upsertGithubRepository,
  upsertGithubIssue,
  persistGithubIssueEvent,
  processWebhook,
  labelClaudeOnIssue,
};
