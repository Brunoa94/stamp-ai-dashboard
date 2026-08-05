import {
  CreateGithubIssueData,
  CreateGithubIssueEventData,
  CreateGithubRepositoryData,
  GithubIssueEventStatus,
  GithubWebhookPayload,
} from "../types/github.js";

type CreateGithubIssueEventMapperInput = {
  payload: GithubWebhookPayload;
  rawPayload: unknown;
  deliveryId: string;
  eventType: string;
  signatureValid: boolean;
  repositoryId?: number;
  issueId?: number;
  processingStatus?: GithubIssueEventStatus;
  processingError?: string;
  retryCount?: number;
  processedAt?: Date;
};

const toDate = (value?: string | null): Date | undefined => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const toBigInt = (value?: number | string | null): bigint | undefined => {
  if (value === undefined || value === null) return undefined;
  return BigInt(value);
};

const toInt = (value?: number | string | null): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const createGithubRepositoryMapper = (
  payload: GithubWebhookPayload,
): CreateGithubRepositoryData => {
  if (!payload.repository) {
    throw new Error("Missing repository in GitHub payload");
  }

  const installationId = toInt(payload.installation?.id);
  if (!installationId) {
    throw new Error("Missing installation.id in GitHub payload");
  }

  return {
    github_repository_id: BigInt(payload.repository.id),
    installation_id: installationId,
    owner_id: toBigInt(payload.repository.owner?.id),
    owner_login: payload.repository.owner?.login ?? "",
    name: payload.repository.name,
    full_name: payload.repository.full_name,
    private: payload.repository.private,
    archived: payload.repository.archived,
    disabled: payload.repository.disabled,
    default_branch: payload.repository.default_branch ?? null,
    html_url: payload.repository.html_url ?? null,
    api_url: payload.repository.url ?? null,
    pushed_at: toDate(payload.repository.pushed_at) ?? null,
    github_created_at: toDate(payload.repository.created_at) ?? null,
    github_updated_at: toDate(payload.repository.updated_at) ?? null,
  };
};

const createGithubIssueMapper = (
  payload: GithubWebhookPayload,
  repositoryId: number,
): CreateGithubIssueData => {
  if (!payload.issue) {
    throw new Error("Missing issue in GitHub payload");
  }

  const installationId = toInt(payload.installation?.id);
  if (!installationId) {
    throw new Error("Missing installation.id in GitHub payload");
  }

  return {
    github_issue_id: BigInt(payload.issue.id),
    repository_id: repositoryId,
    installation_id: installationId,
    issue_number: payload.issue.number,
    node_id: payload.issue.node_id ?? null,
    title: payload.issue.title,
    body: payload.issue.body ?? null,
    state: payload.issue.state,
    state_reason: payload.issue.state_reason ?? null,
    author_id: toBigInt(payload.issue.user?.id),
    author_login: payload.issue.user?.login ?? null,
    labels: payload.issue.labels ?? null,
    assignees: payload.issue.assignees ?? null,
    comments_count: payload.issue.comments ?? 0,
    is_pull_request: Boolean(payload.issue.pull_request),
    html_url: payload.issue.html_url ?? null,
    github_created_at: toDate(payload.issue.created_at) ?? null,
    github_updated_at: toDate(payload.issue.updated_at) ?? null,
    github_closed_at: toDate(payload.issue.closed_at) ?? null,
  };
};

const createGithubIssueEventMapper = ({
  payload,
  rawPayload,
  deliveryId,
  eventType,
  signatureValid,
  repositoryId,
  issueId,
  processingStatus = "pending",
  processingError,
  retryCount = 0,
  processedAt,
}: CreateGithubIssueEventMapperInput): CreateGithubIssueEventData => ({
  delivery_id: deliveryId,
  event_type: eventType,
  action: payload.action ?? null,
  installation_id: toInt(payload.installation?.id) ?? null,
  repository_id: repositoryId ?? null,
  issue_id: issueId ?? null,
  sender_id: toBigInt(payload.sender?.id) ?? null,
  sender_login: payload.sender?.login ?? null,
  signature_valid: signatureValid,
  raw_payload: rawPayload,
  processing_status: processingStatus,
  processing_error: processingError ?? null,
  retry_count: retryCount,
  event_occurred_at:
    toDate(payload.issue?.updated_at) ??
    toDate(payload.repository?.updated_at) ??
    null,
  processed_at: processedAt ?? null,
});

export const GithubMapper = {
  createGithubRepositoryMapper,
  createGithubIssueMapper,
  createGithubIssueEventMapper,
};
