# Analytics Intelligence Agent - Implementation Plan

## Overview

Implement an AI-powered Analytics Agent that analyzes GA4 funnel data, identifies conversion bottlenecks, highlights key metrics, and provides actionable recommendations to improve conversions.

**Key Decisions:**
- LLM Provider: Anthropic Claude API
- Trigger: On-demand API endpoint
- Output: Structured JSON
- Persistence: Database storage for analysis history

---

## Implementation Steps

### Phase 1: Dependencies & Configuration

1. **Add dependency:**
   ```bash
   npm install @anthropic-ai/sdk
   ```

2. **Update environment config** in `src/config/env.ts`:
   - `ANTHROPIC_API_KEY`
   - `ANTHROPIC_MODEL` (default: claude-sonnet-4-20250514)
   - `ANALYTICS_AGENT_MAX_TOKENS` (default: 4096)

### Phase 2: Database Schema

Add to `prisma/schema.prisma`:

```prisma
model AnalyticsAnalysis {
  id                  Int      @id @default(autoincrement())
  analysis_type       String   @db.VarChar(50)
  date_range_start    String   @db.VarChar(20)
  date_range_end      String   @db.VarChar(20)
  raw_analytics_data  Json
  analysis_result     Json
  model_used          String   @db.VarChar(50)
  tokens_used         Int?
  processing_time_ms  Int?
  status              String   @default("completed") @db.VarChar(20)
  error_message       String?
  created_at          DateTime @default(now())
  updated_at          DateTime @updatedAt

  recommendations     AnalyticsRecommendation[]
}

model AnalyticsRecommendation {
  id              Int       @id @default(autoincrement())
  analysis_id     Int
  category        String    @db.VarChar(50)
  priority        String    @db.VarChar(20)
  title           String    @db.VarChar(200)
  description     String
  expected_impact String?   @db.VarChar(100)
  implemented     Boolean   @default(false)
  implemented_at  DateTime?
  created_at      DateTime  @default(now())

  analysis        AnalyticsAnalysis @relation(fields: [analysis_id], references: [id], onDelete: Cascade)
}
```

Run migration: `npm run migrate`

### Phase 3: New Files to Create

| File | Purpose |
|------|---------|
| `src/lib/anthropic.ts` | Claude client initialization |
| `src/types/analytics-agent.ts` | Type definitions |
| `src/schemas/analytics-agent.schema.ts` | TypeBox validation schemas |
| `src/mappers/analytics-agent.mapper.ts` | Response transformation |
| `src/services/analytics-agent.service.ts` | Core agent logic |
| `src/controllers/analytics-agent.controller.ts` | HTTP handlers |
| `src/routes/analytics-agent.ts` | Route definitions |

### Phase 4: Service Architecture

**analytics-agent.service.ts** core functions:

1. **`gatherAnalyticsData(startDate, endDate)`**
   - Fetch all event types from existing `AnalyticsService`
   - Aggregate e-commerce funnel: select_item → add_to_cart → view_cart → begin_checkout → add_payment_info → purchase
   - Aggregate stamp creation funnel: page_view → image_upload → generate_start → generate_complete → color_select → size_select → create_product → purchase
   - Calculate metrics: total page views, purchases, revenue, AOV, success/failure rates

2. **`buildAnalysisPrompt(context)`**
   - Format funnel data and metrics into structured prompt
   - Include JSON schema for Claude's response

3. **`runAnalysis(request)`**
   - Gather analytics data
   - Call Claude API with system + user prompt
   - Parse JSON response
   - Store analysis in database
   - Store recommendations separately for tracking
   - Return formatted response

### Phase 5: API Endpoints

Register at `/api/analytics-agent`:

| Method | Path | Description |
|--------|------|-------------|
| POST | `/analyze` | Run new analysis |
| GET | `/history` | List past analyses |
| GET | `/:id` | Get specific analysis |

**Request body for `/analyze`:**
```typescript
{
  analysisType: "funnel" | "full" | "custom",
  startDate?: string,
  endDate?: string,
  customPrompt?: string,
  funnelType?: "ecommerce" | "stamp_creation" | "both"
}
```

### Phase 6: Response Structure

```typescript
{
  id: number,
  analysisType: string,
  dateRange: { startDate, endDate },
  generatedAt: string,
  processingTimeMs: number,
  funnels: [{
    funnelName: string,
    totalSteps: number,
    overallConversionRate: number,
    steps: [{ stepName, eventName, eventCount, dropOffRate, conversionRate }],
    biggestDropOff: { stepName, dropOffRate }
  }],
  metrics: {
    totalPageViews, totalPurchases, totalRevenue, averageOrderValue,
    stampGenerationSuccessRate, stampGenerationFailureRate,
    topPages, topColors, topSizes
  },
  insights: [{
    id, category, severity, title, description, dataPoints
  }],
  recommendations: [{
    id, category, priority, title, description,
    expectedImpact, implementationSteps
  }],
  summary: string
}
```

### Phase 7: Route Registration

Update `src/app.ts`:
```typescript
import analyticsAgentRoutes from "./routes/analytics-agent.js";
app.register(analyticsAgentRoutes, { prefix: "/api/analytics-agent" });
```

---

## Critical Files to Modify

- `src/config/env.ts` - Add Anthropic config
- `prisma/schema.prisma` - Add new models
- `src/app.ts` - Register routes

## Files to Reference (patterns)

- `src/services/analytics.service.ts` - Data fetching
- `src/schemas/analytics.schema.ts` - TypeBox patterns
- `src/types/analytics.ts` - Type patterns

---

## Verification Plan

1. **Unit tests:** Test prompt building, response parsing, mapper functions
2. **Integration test:** Call `/api/analytics-agent/analyze` with test date range
3. **Verify response:** Check that funnels array contains calculated drop-off rates
4. **Verify persistence:** Query database for stored analysis
5. **Verify history endpoint:** Call `/api/analytics-agent/history` to list analyses
6. **Test error handling:** Verify failed analyses are logged with error messages

---

## Estimated New Files

```
src/
├── lib/
│   └── anthropic.ts              (NEW)
├── types/
│   └── analytics-agent.ts        (NEW)
├── schemas/
│   └── analytics-agent.schema.ts (NEW)
├── mappers/
│   └── analytics-agent.mapper.ts (NEW)
├── services/
│   └── analytics-agent.service.ts (NEW)
├── controllers/
│   └── analytics-agent.controller.ts (NEW)
└── routes/
    └── analytics-agent.ts        (NEW)
```
