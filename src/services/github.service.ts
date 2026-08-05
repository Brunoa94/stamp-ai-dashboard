import { GithubRepository, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { GithubMapper } from "../mappers/github.mapper.js";
import {
  DedupeGithubWebhookDeliveryInput,
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
      labels: toNullableJson(mappedData.labels),
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
  } catch {
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

async function processWebhook({
  payload,
  rawPayload,
  deliveryId,
  eventType,
  signatureValid,
}: ProcessGithubWebhookInput) {
  const repository = await upsertGithubRepository({ payload });
  const issue = await upsertGithubIssue({
    payload,
    repositoryId: repository.id,
  });

  const event = await persistGithubIssueEvent({
    payload,
    rawPayload,
    deliveryId,
    eventType,
    signatureValid,
    repositoryId: repository.id,
    issueId: issue?.id,
  });

  return {
    repository,
    issue,
    event,
  };
}

export const GithubService = {
  isDuplicateWebhookDelivery,
  upsertGithubRepository,
  upsertGithubIssue,
  persistGithubIssueEvent,
  processWebhook,
};
