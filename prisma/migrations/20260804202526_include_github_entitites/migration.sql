-- CreateTable
CREATE TABLE "GithubRepository" (
    "id" SERIAL NOT NULL,
    "github_repository_id" BIGINT NOT NULL,
    "installation_id" INTEGER NOT NULL,
    "owner_id" BIGINT,
    "owner_login" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(200) NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "default_branch" VARCHAR(100),
    "html_url" VARCHAR(255),
    "api_url" VARCHAR(255),
    "pushed_at" TIMESTAMP(3),
    "github_created_at" TIMESTAMP(3),
    "github_updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubIssue" (
    "id" SERIAL NOT NULL,
    "github_issue_id" BIGINT NOT NULL,
    "repository_id" INTEGER NOT NULL,
    "installation_id" INTEGER NOT NULL,
    "issue_number" INTEGER NOT NULL,
    "node_id" VARCHAR(100),
    "title" VARCHAR(300) NOT NULL,
    "body" TEXT,
    "state" VARCHAR(20) NOT NULL,
    "state_reason" VARCHAR(30),
    "author_id" BIGINT,
    "author_login" VARCHAR(100),
    "labels" JSONB,
    "assignees" JSONB,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "is_pull_request" BOOLEAN NOT NULL DEFAULT false,
    "html_url" VARCHAR(255),
    "github_created_at" TIMESTAMP(3),
    "github_updated_at" TIMESTAMP(3),
    "github_closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubIssueEvent" (
    "id" SERIAL NOT NULL,
    "delivery_id" VARCHAR(100) NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,
    "action" VARCHAR(50),
    "installation_id" INTEGER,
    "repository_id" INTEGER,
    "issue_id" INTEGER,
    "sender_id" BIGINT,
    "sender_login" VARCHAR(100),
    "signature_valid" BOOLEAN NOT NULL DEFAULT false,
    "raw_payload" JSONB NOT NULL,
    "processing_status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "processing_error" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_occurred_at" TIMESTAMP(3),
    "processed_at" TIMESTAMP(3),

    CONSTRAINT "GithubIssueEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepository_github_repository_id_key" ON "GithubRepository"("github_repository_id");

-- CreateIndex
CREATE INDEX "GithubRepository_installation_id_idx" ON "GithubRepository"("installation_id");

-- CreateIndex
CREATE INDEX "GithubRepository_owner_login_idx" ON "GithubRepository"("owner_login");

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepository_installation_id_full_name_key" ON "GithubRepository"("installation_id", "full_name");

-- CreateIndex
CREATE UNIQUE INDEX "GithubIssue_github_issue_id_key" ON "GithubIssue"("github_issue_id");

-- CreateIndex
CREATE INDEX "GithubIssue_installation_id_idx" ON "GithubIssue"("installation_id");

-- CreateIndex
CREATE INDEX "GithubIssue_repository_id_state_idx" ON "GithubIssue"("repository_id", "state");

-- CreateIndex
CREATE INDEX "GithubIssue_github_updated_at_idx" ON "GithubIssue"("github_updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "GithubIssue_repository_id_issue_number_key" ON "GithubIssue"("repository_id", "issue_number");

-- CreateIndex
CREATE UNIQUE INDEX "GithubIssueEvent_delivery_id_key" ON "GithubIssueEvent"("delivery_id");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_event_type_action_idx" ON "GithubIssueEvent"("event_type", "action");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_installation_id_idx" ON "GithubIssueEvent"("installation_id");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_repository_id_idx" ON "GithubIssueEvent"("repository_id");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_issue_id_idx" ON "GithubIssueEvent"("issue_id");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_processing_status_idx" ON "GithubIssueEvent"("processing_status");

-- CreateIndex
CREATE INDEX "GithubIssueEvent_received_at_idx" ON "GithubIssueEvent"("received_at");

-- AddForeignKey
ALTER TABLE "GithubIssue" ADD CONSTRAINT "GithubIssue_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "GithubRepository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubIssueEvent" ADD CONSTRAINT "GithubIssueEvent_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "GithubRepository"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubIssueEvent" ADD CONSTRAINT "GithubIssueEvent_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "GithubIssue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
