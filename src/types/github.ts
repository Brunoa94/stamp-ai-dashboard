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

export type GithubIssueEventStatus = "pending" | "processed" | "failed";

export type CreateGithubRepositoryData = {
  github_repository_id: bigint;
  installation_id: number;
  owner_id: bigint | undefined;
  owner_login: string;
  name: string;
  full_name: string;
  private: boolean;
  archived: boolean;
  disabled: boolean;
  default_branch: string | null;
  html_url: string | null;
  api_url: string | null;
  pushed_at: Date | null;
  github_created_at: Date | null;
  github_updated_at: Date | null;
};

export type CreateGithubIssueData = {
  github_issue_id: bigint;
  repository_id: number;
  installation_id: number;
  issue_number: number;
  node_id: string | null;
  title: string;
  body: string | null;
  state: string;
  state_reason: string | null;
  author_id: bigint | undefined;
  author_login: string | null;
  labels: unknown;
  assignees: unknown;
  comments_count: number;
  is_pull_request: boolean;
  html_url: string | null;
  github_created_at: Date | null;
  github_updated_at: Date | null;
  github_closed_at: Date | null;
};

export type CreateGithubIssueEventData = {
  delivery_id: string;
  event_type: string;
  action: string | null;
  installation_id: number | null;
  repository_id: number | null;
  issue_id: number | null;
  sender_id: bigint | null;
  sender_login: string | null;
  signature_valid: boolean;
  raw_payload: unknown;
  processing_status: GithubIssueEventStatus;
  processing_error: string | null;
  retry_count: number;
  event_occurred_at: Date | null;
  processed_at: Date | null;
};

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
