import { Type, Static } from "@fastify/type-provider-typebox";
import { AnalyticsEventNameSchema } from "./analytics.schema.js";

// ============================================
// Base Schemas (matching Prisma models)
// ============================================

// AnalyticsAnalysis model schema
export const AnalyticsAnalysisSchema = Type.Object({
  id: Type.Number(),
  analysis_type: Type.String({ maxLength: 50 }),
  start_date: Type.String({ maxLength: 20 }),
  end_date: Type.String({ maxLength: 20 }),
  raw_analytics_data: Type.Unknown(),
  analysis_result: Type.Unknown(),
  model_used: Type.String({ maxLength: 50 }),
  tokens_used: Type.Optional(Type.Number()),
  processing_time_ms: Type.Optional(Type.Number()),
  status: Type.String({ maxLength: 20, default: "completed" }),
  error_message: Type.Optional(Type.String()),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

// AnalyticsRecommendation model schema
export const AnalyticsRecommendationSchema = Type.Object({
  id: Type.Number(),
  analysis_id: Type.Number(),
  category: Type.String({ maxLength: 50 }),
  priority: Type.String({ maxLength: 20 }),
  title: Type.String({ maxLength: 200 }),
  description: Type.String(),
  expected_impact: Type.Optional(Type.String({ maxLength: 100 })),
  implemented: Type.Boolean({ default: false }),
  implemented_at: Type.Optional(Type.String({ format: "date-time" })),
  created_at: Type.String({ format: "date-time" }),
});

export const AnalyticsFunnelTypes = Type.Union([
  Type.Literal("acquisition"),
  Type.Literal("engagement"),
  Type.Literal("product_configuration"),
  Type.Literal("generation"),
  Type.Literal("ecommerce"),
  Type.Literal("authentication"),
]);

// AnalyticsAnalysis with recommendations (nested relation)
export const AnalyticsAnalysisWithRecommendationsSchema = Type.Object({
  ...AnalyticsAnalysisSchema.properties,
  recommendations: Type.Array(AnalyticsRecommendationSchema),
});

// ============================================
// Input Schemas (for create/update operations)
// ============================================

export const CreateAnalyticsAnalysisSchema = Type.Object({
  analysis_type: Type.String({ maxLength: 50 }),
  start_date: Type.String({ maxLength: 20 }),
  end_date: Type.String({ maxLength: 20 }),
  events: AnalyticsFunnelTypes,
});

export const RequestAnalyticsSchema = Type.Object({
  start_date: Type.String({ maxLength: 20 }),
  end_date: Type.String({ maxLength: 20 }),
  funnels: Type.Array(AnalyticsFunnelTypes),
});

export const UpdateAnalyticsAnalysisSchema = Type.Partial(
  CreateAnalyticsAnalysisSchema,
);

export const CreateAnalyticsRecommendationSchema = Type.Object({
  analysis_id: Type.Number(),
  category: Type.String({ maxLength: 50 }),
  priority: Type.String({ maxLength: 20 }),
  title: Type.String({ maxLength: 200 }),
  description: Type.String(),
  expected_impact: Type.Optional(Type.String({ maxLength: 100 })),
  implemented: Type.Optional(Type.Boolean({ default: false })),
  implemented_at: Type.Optional(Type.String({ format: "date-time" })),
});

export const UpdateAnalyticsRecommendationSchema = Type.Partial(
  Type.Omit(CreateAnalyticsRecommendationSchema, ["analysis_id"]),
);

// ============================================
// Query/Params Schemas
// ============================================

export const AnalysisIdParamsSchema = Type.Object({
  id: Type.Number(),
});

export const RecommendationIdParamsSchema = Type.Object({
  id: Type.Number(),
});

export const AnalysisQuerySchema = Type.Object({
  analysis_type: Type.Optional(Type.String()),
  status: Type.Optional(Type.String()),
  limit: Type.Optional(Type.Number({ default: 10 })),
  offset: Type.Optional(Type.Number({ default: 0 })),
});

// ============================================
// Response Schemas
// ============================================

const ErrorSchema = Type.Object({
  error: Type.String(),
});

// Route schemas for API endpoints
export const getAnalysisListSchema = {
  tags: ["Analytics Agents"],
  summary: "List analytics analyses",
  description: "Retrieves a paginated list of analytics analyses",
  operationId: "getAnalysisList",
  querystring: AnalysisQuerySchema,
  response: {
    200: Type.Array(AnalyticsAnalysisSchema),
    500: ErrorSchema,
  },
};

export const getAnalysisByIdSchema = {
  tags: ["Analytics Agents"],
  summary: "Get analysis by ID",
  description: "Retrieves a single analytics analysis with its recommendations",
  operationId: "getAnalysisById",
  params: AnalysisIdParamsSchema,
  response: {
    200: AnalyticsAnalysisWithRecommendationsSchema,
    404: ErrorSchema,
    500: ErrorSchema,
  },
};

export const createAnalysisSchema = {
  tags: ["Analytics Agents"],
  summary: "Create analytics analysis",
  description: "Creates a new analytics analysis record",
  operationId: "createAnalysis",
  body: RequestAnalyticsSchema,
  response: {
    201: AnalyticsAnalysisSchema,
    400: ErrorSchema,
    500: ErrorSchema,
  },
};

export const updateAnalysisSchema = {
  tags: ["Analytics Agents"],
  summary: "Update analytics analysis",
  description: "Updates an existing analytics analysis record",
  operationId: "updateAnalysis",
  params: AnalysisIdParamsSchema,
  body: UpdateAnalyticsAnalysisSchema,
  response: {
    200: AnalyticsAnalysisSchema,
    404: ErrorSchema,
    500: ErrorSchema,
  },
};

export const deleteAnalysisSchema = {
  tags: ["Analytics Agents"],
  summary: "Delete analytics analysis",
  description: "Deletes an analytics analysis and its recommendations",
  operationId: "deleteAnalysis",
  params: AnalysisIdParamsSchema,
  response: {
    204: Type.Null(),
    404: ErrorSchema,
    500: ErrorSchema,
  },
};

export const createRecommendationSchema = {
  tags: ["Analytics Agents"],
  summary: "Create recommendation",
  description: "Creates a new recommendation for an analysis",
  operationId: "createRecommendation",
  body: CreateAnalyticsRecommendationSchema,
  response: {
    201: AnalyticsRecommendationSchema,
    400: ErrorSchema,
    500: ErrorSchema,
  },
};

export const updateRecommendationSchema = {
  tags: ["Analytics Agents"],
  summary: "Update recommendation",
  description: "Updates an existing recommendation",
  operationId: "updateRecommendation",
  params: RecommendationIdParamsSchema,
  body: UpdateAnalyticsRecommendationSchema,
  response: {
    200: AnalyticsRecommendationSchema,
    404: ErrorSchema,
    500: ErrorSchema,
  },
};

export const markRecommendationImplementedSchema = {
  tags: ["Analytics Agents"],
  summary: "Mark recommendation as implemented",
  description: "Marks a recommendation as implemented with current timestamp",
  operationId: "markRecommendationImplemented",
  params: RecommendationIdParamsSchema,
  response: {
    200: AnalyticsRecommendationSchema,
    404: ErrorSchema,
    500: ErrorSchema,
  },
};

// ============================================
// Type Exports
// ============================================

export type AnalyticsAnalysis = Static<typeof AnalyticsAnalysisSchema>;
export type AnalyticsRecommendation = Static<
  typeof AnalyticsRecommendationSchema
>;
export type AnalyticsAnalysisWithRecommendations = Static<
  typeof AnalyticsAnalysisWithRecommendationsSchema
>;
export type CreateAnalyticsAnalysis = Static<
  typeof CreateAnalyticsAnalysisSchema
>;
export type UpdateAnalyticsAnalysis = Static<
  typeof UpdateAnalyticsAnalysisSchema
>;
export type CreateAnalyticsRecommendation = Static<
  typeof CreateAnalyticsRecommendationSchema
>;
export type UpdateAnalyticsRecommendation = Static<
  typeof UpdateAnalyticsRecommendationSchema
>;
export type AnalysisIdParams = Static<typeof AnalysisIdParamsSchema>;
export type RecommendationIdParams = Static<
  typeof RecommendationIdParamsSchema
>;
export type AnalysisQuery = Static<typeof AnalysisQuerySchema>;
