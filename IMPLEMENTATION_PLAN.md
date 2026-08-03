# Stamp AI Dashboard - Integration and Financial Intelligence Plan

## Goal

Implement two capabilities in this backend:

1. GitHub issue tracking with AI-assisted analysis (Claude API) that proposes solutions and opens draft PRs.
2. Unified ingestion of Stripe invoices, PayPal invoices/transactions, and Printify order costs to compute margins and financial metrics.

## Constraint Clarification

AI is part of the product features. The "no AI" constraint applies to development approach:

- You will build this with regular software engineering (architecture, APIs, tests, CI), not by depending on AI to write your production code.
- AI should be used at runtime in the feature itself (issue understanding, proposal generation).

For the issue-to-PR flow, combine deterministic controls with AI reasoning:

- Rule-based issue classification
- Claude prompt templates and structured outputs
- Playbook-guided proposal generation
- Template-driven branch and PR creation
- Human review and approval before merge

---

## Phase 0 - Foundation (Week 1)

### Deliverables

- Stable integration architecture
- Background processing capability
- Shared observability and audit structure

### Steps

1. Add integration module boundaries:
   - `src/integrations/github`
   - `src/integrations/stripe`
   - `src/integrations/paypal`
   - `src/integrations/printify`
2. Introduce async job processing:
   - Queue-backed worker (Redis + BullMQ or DB-backed jobs)
   - Retry, backoff, dead-letter handling
3. Add provider sync audit logging:
   - Job id, provider, start/end, outcome, retry count
4. Extend env configuration:
   - GitHub app credentials
   - Stripe secret and webhook secret
   - PayPal OAuth credentials
   - Printify API token
5. Define error model and telemetry conventions:
   - Correlation id propagation
   - Structured logs and alert-friendly status fields

### Study Topics

- Fastify plugin boundaries
- Job processing patterns in Node.js
- Idempotent processing design

---

## Phase 1 - GitHub Issues to PR Automation with Claude (Week 2-3)

### Deliverables

- GitHub webhook ingestion and storage
- AI issue understanding and proposed fix plan
- Automated draft PR creation with strict safety controls

### Steps

1. Create a GitHub App:
   - Permissions: Issues (RW), Contents (RW), Pull Requests (RW), Metadata (R)
   - Events: `issues`, `issue_comment`, `pull_request`

   ngrok http --url=cheddar-uncurled-shingle.ngrok-free.dev 80

2. Add webhook endpoint:
   - `POST /api/github/webhooks`
   - Verify webhook signature (HMAC)
   - Deduplicate deliveries by event id
3. Persist GitHub entities:
   - Installation, repository, issue, issue events
4. Implement issue triage pipeline:
   - Inputs: labels, title tokens, body tokens, repo path hints, priority labels
   - Outputs: category, domain, recommended action, confidence score
5. Integrate Claude API for issue understanding:
   - Send normalized issue payload plus repository context summary
   - Require strict JSON output schema
   - Capture: root-cause hypothesis, affected modules, patch strategy, test plan
   - Persist prompt/response metadata for traceability
6. Build a playbook catalog:
   - Define known issue classes (examples below)
   - Each playbook contains diagnosis checklist, files to inspect, guardrails, test commands, PR template
7. Implement PR automation flow:
   - Create branch naming convention: `issue/<number>-<slug>`
   - Use AI proposal to build a patch plan (or run restricted codemods/scripts)
   - Commit changes and open draft PR with linked issue, rationale, and test checklist
8. Add controls:
   - Never auto-merge
   - Require CI + code review
   - Allowlist only selected labels/repos for automation
   - Enforce policy checks before any write action (blocked files/patterns)

### Example Playbooks

- Validation schema mismatch
- Missing route registration
- Prisma migration mismatch (non-destructive only)
- Broken mapper field conversion
- Missing OpenAPI schema wiring

### Study Topics

- GitHub App auth model
- Webhook security and replay prevention
- Octokit API for branch/commit/PR lifecycle
- Claude API integration patterns (structured output, retries, timeout)
- Prompt engineering for deterministic JSON contracts
- Safe automation boundaries and approval gates

---

## Phase 2 - Stripe, PayPal, and Printify Ingestion (Week 3-5)

### Deliverables

- Incremental sync pipelines for each provider
- Normalized ledger storage
- Reconciliation-ready financial records

### Steps

1. Stripe ingestion:
   - Pull invoices and relevant payment/fee fields
   - Persist gross, fee, net, currency, paid date, customer references
   - Cursor-based incremental sync
2. PayPal ingestion:
   - Implement OAuth token management
   - Pull invoice/transaction data required for gross and fee
   - Normalize fields to internal schema
3. Printify ingestion:
   - Pull orders and cost components
   - Persist product cost, shipping cost, taxes (if available), status
4. Introduce normalized storage model:
   - External invoices/payments
   - External order costs
   - Unified ledger entries
   - Reconciliation links
5. Add sync orchestration endpoints:
   - `POST /api/sync/stripe`
   - `POST /api/sync/paypal`
   - `POST /api/sync/printify`
6. Add scheduled execution:
   - Cron job or worker scheduler
   - Rate-limit aware batching and retries

### Study Topics

- Stripe invoice and payment data model
- PayPal invoicing and transaction APIs
- Printify order and cost fields
- Pagination, rate limits, and checkpointing

---

## Phase 3 - Reconciliation and Financial Metrics (Week 5-6)

### Deliverables

- Revenue-to-cost matching
- Margin analytics endpoints
- KPI layer for dashboard consumption

### Steps

1. Build reconciliation service:
   - Match revenue records to Printify order costs
   - Matching keys: external order id, metadata links, invoice references
   - Flag unmatched and ambiguous records
2. Add currency normalization:
   - Store original currency values
   - Convert to base currency using daily FX table
3. Expose metrics endpoints:
   - `GET /api/metrics/revenue`
   - `GET /api/metrics/margins`
   - `GET /api/metrics/reconciliation`
   - `GET /api/metrics/providers`
4. Add dimensions and filters:
   - Daily/weekly/monthly windows
   - Provider breakdown
   - Currency and status filters

### Suggested KPI Set

- Gross revenue
- Net revenue
- COGS (Printify)
- Gross margin
- Margin percentage
- Platform fee percentage
- Refund rate
- Failed payment rate
- Average order value
- Provider revenue split
- Unreconciled revenue percentage

### Study Topics

- Reconciliation patterns in payment systems
- Multi-currency reporting design
- Financial KPI definitions and caveats

---

## Phase 4 - Hardening, Security, and QA (Week 6-7)

### Deliverables

- Reliable production behavior
- Security controls validated
- Test coverage for critical paths

### Steps

1. Testing strategy:
   - Unit: classifiers, mappers, reconciliation rules
   - Integration: provider clients with mocked APIs
   - Contract: webhook payload parsing/signature checks
   - E2E: sync + reconciliation + metrics flow
2. Security controls:
   - Secret management and rotation
   - Least privilege app tokens
   - Webhook signature enforcement
3. Reliability and operations:
   - Retry and dead-letter visibility
   - Sync lag alerting
   - Re-run windows for failed jobs
   - Audit trails for all automated PR attempts

### Study Topics

- API secret management practices
- Observability patterns for background jobs
- Failure mode and rollback design

---

## Data Model Blueprint (High-Level)

Add or evolve models (names can be adjusted):

- `GithubInstallation`
- `GithubRepository`
- `GithubIssue`
- `GithubIssueEvent`
- `IssueAutomationRule`
- `IssueExecution`
- `IssueAiAnalysis`
- `PullRequestExecution`
- `ProviderSyncRun`
- `ExternalInvoice`
- `ExternalPayment`
- `ExternalOrderCost`
- `FinancialLedgerEntry`
- `ReconciliationLink`
- `CurrencyRate`

Core principles:

- Keep provider raw identifiers for traceability
- Track sync checkpoints per provider and account
- Enforce idempotency on external event ids

---

## Recommended Safety Policy for Issue Automation

1. Claude output must validate against strict JSON schema before use.
2. Auto-open draft PR only for allowlisted issue categories.
3. Never auto-merge changes.
4. Require green CI and at least one human approval.
5. Block destructive operations (schema drops, bulk deletes, force pushes).
6. Keep full execution logs linked to issue id and PR id.

---

## Milestone Checklist

1. GitHub webhooks are ingested and stored with replay protection.
2. Triage pipeline + Claude analysis produce structured fix proposals.
3. Safe classes create draft PRs with templates and checklists.
4. Stripe sync stores invoice and fee data incrementally.
5. PayPal sync stores invoice/transaction financial data.
6. Printify sync stores order-level cost components.
7. Reconciliation links revenue and production cost records.
8. Metrics endpoints return margin and provider KPIs.
9. Scheduling and retry logic handles transient provider failures.
10. Security, tests, and observability are production ready.

---

## Study Roadmap (Order)

1. GitHub Apps and webhook security.
2. AI-assisted automation design (rules + prompts + playbooks).
3. Stripe data model for invoices, payments, and fees.
4. PayPal API model and auth lifecycle.
5. Printify order cost extraction and mapping.
6. Queue-driven sync architecture.
7. Reconciliation algorithms.
8. Multi-currency analytics and KPI modeling.
9. Operational monitoring and reliability patterns.

---

## Suggested First Sprint (Execution-Ready)

1. Create GitHub webhook endpoint with signature validation.
2. Persist issue events and dedup deliveries.
3. Implement Claude analysis endpoint and strict schema validation.
4. Implement first 3 playbooks that consume Claude outputs.
5. Add Stripe incremental sync with checkpoint storage.
6. Add normalized ledger tables and one margin endpoint.
7. Add job runner with retry and dead-letter queue.
8. Add tests for webhook validation, AI output validation, and sync idempotency.

This sprint should produce an end-to-end vertical slice: issue ingestion to AI analysis to draft PR (safe class) plus Stripe-based initial margin visibility.
