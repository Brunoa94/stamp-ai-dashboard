import { Static } from "@fastify/type-provider-typebox";
import {
  GithubWebhookBodySchema,
  GithubWebhookInstallationSchema,
  GithubWebhookIssueSchema,
  GithubWebhookRepositorySchema,
  GithubWebhookUserSchema,
} from "../schemas/github.schema.js";

export type GithubUserPayload = Static<typeof GithubWebhookUserSchema>;
export type GithubRepositoryPayload = Static<
  typeof GithubWebhookRepositorySchema
>;
export type GithubIssuePayload = Static<typeof GithubWebhookIssueSchema>;
export type GithubInstallationPayload = Static<
  typeof GithubWebhookInstallationSchema
>;
export type GithubWebhookPayload = Static<typeof GithubWebhookBodySchema>;

export type UpsertGithubRepositoryInput = {
  payload: GithubWebhookPayload;
};

export type UpsertGithubIssueInput = {
  payload: GithubWebhookPayload;
  repositoryId: number;
};

export type PersistGithubIssueEventInput = {
  payload: GithubWebhookPayload;
  rawPayload: unknown;
  deliveryId: string;
  eventType: string;
  signatureValid: boolean;
  repositoryId?: number;
  issueId?: number;
};

export type ProcessGithubWebhookInput = {
  payload: GithubWebhookPayload;
  rawPayload: unknown;
  deliveryId: string;
  eventType: string;
  signatureValid: boolean;
};

export type RedisSetLike = {
  set: (
    key: string,
    value: string,
    mode: "EX",
    ttlSeconds: number,
    condition: "NX",
  ) => Promise<string | null>;
};

export type DedupeGithubWebhookDeliveryInput = {
  redis: RedisSetLike;
  deliveryId: string;
  ttlSeconds?: number;
};
