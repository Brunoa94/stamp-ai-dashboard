import { Type } from "@fastify/type-provider-typebox";

export const GithubWebhookUserSchema = Type.Object({
  id: Type.Union([Type.Number(), Type.String()]),
  login: Type.String(),
});

export const GithubWebhookInstallationSchema = Type.Object({
  id: Type.Union([Type.Number(), Type.String()]),
});

export const GithubWebhookRepositorySchema = Type.Object({
  id: Type.Union([Type.Number(), Type.String()]),
  owner: GithubWebhookUserSchema,
  name: Type.String(),
  full_name: Type.String(),
  private: Type.Boolean(),
  archived: Type.Boolean(),
  disabled: Type.Boolean(),
  default_branch: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  html_url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  pushed_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  created_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  updated_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
});

export const GithubWebhookIssueSchema = Type.Object({
  id: Type.Union([Type.Number(), Type.String()]),
  number: Type.Number(),
  node_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  title: Type.String(),
  body: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  state: Type.String(),
  state_reason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  user: Type.Optional(Type.Union([GithubWebhookUserSchema, Type.Null()])),
  labels: Type.Optional(Type.Unknown()),
  assignees: Type.Optional(Type.Unknown()),
  comments: Type.Optional(Type.Number()),
  pull_request: Type.Optional(Type.Unknown()),
  html_url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  created_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  updated_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  closed_at: Type.Optional(Type.Union([Type.String(), Type.Null()])),
});

export const GithubWebhookBodySchema = Type.Object(
  {
    action: Type.Optional(Type.String()),
    installation: Type.Optional(GithubWebhookInstallationSchema),
    repository: Type.Optional(GithubWebhookRepositorySchema),
    issue: Type.Optional(GithubWebhookIssueSchema),
    sender: Type.Optional(GithubWebhookUserSchema),
  },
  { additionalProperties: true },
);

const GithubWebhookHeadersSchema = Type.Object({
  "x-hub-signature-256": Type.String({
    description: "GitHub HMAC SHA-256 signature header",
  }),
  "x-github-delivery": Type.String({
    description: "GitHub webhook delivery id",
  }),
  "x-github-event": Type.Optional(
    Type.String({ description: "GitHub webhook event type" }),
  ),
});

const GithubWebhookProcessed = Type.Object({
  ok: Type.Literal(true),
});

const ErrorSchema = Type.Object({
  error: Type.String(),
});

export const githubWebhookSchema = {
  tags: ["GitHub"],
  summary: "Receive GitHub webhooks",
  description:
    "Validates webhook signature, deduplicates deliveries, and accepts event payloads.",
  operationId: "githubWebhook",
  headers: GithubWebhookHeadersSchema,
  body: GithubWebhookBodySchema,
  response: {
    200: GithubWebhookProcessed,
    202: GithubWebhookProcessed,
    400: ErrorSchema,
    401: ErrorSchema,
  },
};
