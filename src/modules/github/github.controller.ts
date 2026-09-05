import { FastifyReply, FastifyRequest } from "fastify";
import {
  GithubWebhookPayload,
  LabelClaudeOnIssue,
  ProcessGithubWebhookInput,
} from "./github.types.js";
import { ErrorType, FastifyBody } from "../../shared/types/shared.js";
import { GithubService } from "./github.service.js";

async function webhookEvent(
  request: FastifyRequest<FastifyBody<GithubWebhookPayload>>,
  reply: FastifyReply,
) {
  try {
    const deliveryIdHeader = request.headers["x-github-delivery"];
    const eventHeader = request.headers["x-github-event"];

    const deliveryId = Array.isArray(deliveryIdHeader)
      ? deliveryIdHeader[0]
      : deliveryIdHeader;
    const eventType = Array.isArray(eventHeader) ? eventHeader[0] : eventHeader;

    if (!deliveryId) {
      return reply.code(400).send({
        error: "Missing x-github-delivery header",
      });
    }

    const body: ProcessGithubWebhookInput = {
      payload: request.body,
      rawPayload: request.rawBody ?? request.body,
      deliveryId,
      eventType: eventType ?? "unknown",
      signatureValid: true,
      logger: request.log,
    };

    await GithubService.processWebhook(body);

    return reply.status(200).send({ ok: true });
  } catch (e) {
    const error = e as ErrorType;
    return reply.code(error.status).send(error.error);
  }
}

async function labelClaudeOnGithubIssue(
  request: FastifyRequest<FastifyBody<LabelClaudeOnIssue>>,
  reply: FastifyReply,
) {
  try {
    const response = await GithubService.labelClaudeOnIssue({
      githubIssueId: request.body.github_issue_id,
      githubIssueNumber: request.body.github_issue_number,
      logger: request.log,
    });

    return reply.status(200).send({ ok: true });
  } catch (e) {
    const error = e as ErrorType;
    return reply.code(error.status).send(error.error);
  }
}

export const GithubController = {
  webhookEvent,
  labelClaudeOnGithubIssue,
};
