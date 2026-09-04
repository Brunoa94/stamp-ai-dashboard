import { Static } from "@fastify/type-provider-typebox";
import {
  AnalyticsAnalysisSchema,
  AnalyticsRecommendationSchema,
  AnalyticsAnalysisWithRecommendationsSchema,
  CreateAnalyticsAnalysisSchema,
  UpdateAnalyticsAnalysisSchema,
  CreateAnalyticsRecommendationSchema,
  UpdateAnalyticsRecommendationSchema,
  AnalysisIdParamsSchema,
  RecommendationIdParamsSchema,
  AnalysisQuerySchema,
  AnalyticsFunnelTypes,
  RequestAnalyticsSchema,
} from "../schemas/analytics-agents.schema.js";

// Base types
export type AnalyticsAnalysisType = Static<typeof AnalyticsAnalysisSchema>;
export type AnalyticsRecommendationType = Static<
  typeof AnalyticsRecommendationSchema
>;
export type AnalyticsAnalysisWithRecommendationsType = Static<
  typeof AnalyticsAnalysisWithRecommendationsSchema
>;

// Input types
export type CreateAnalyticsAnalysisType = Static<
  typeof CreateAnalyticsAnalysisSchema
>;
export type UpdateAnalyticsAnalysisType = Static<
  typeof UpdateAnalyticsAnalysisSchema
>;
export type CreateAnalyticsRecommendationType = Static<
  typeof CreateAnalyticsRecommendationSchema
>;
export type RequestAnalyticsType = Static<typeof RequestAnalyticsSchema>;
export type UpdateAnalyticsRecommendationType = Static<
  typeof UpdateAnalyticsRecommendationSchema
>;

// Params/Query types
export type AnalysisIdParamsType = Static<typeof AnalysisIdParamsSchema>;
export type RecommendationIdParamsType = Static<
  typeof RecommendationIdParamsSchema
>;
export type AnalysisQueryType = Static<typeof AnalysisQuerySchema>;
export type GAFunnelType = Static<typeof AnalyticsFunnelTypes>;

export type GAEventType =
  | "add_to_cart"
  | "begin_checkout"
  | "color_select"
  | "first_visit"
  | "form_start"
  | "login"
  | "logout"
  | "page_view"
  | "purchase"
  | "remove_from_cart"
  | "scroll"
  | "select_item"
  | "session_start"
  | "size_select"
  | "stamp_create_product"
  | "stamp_generate_complete"
  | "stamp_generate_failed"
  | "stamp_generate_start"
  | "stamp_image_upload"
  | "step_change"
  | "user_engagement"
  | "view_cart";

export const GA_EVENTS_BY_FUNNEL: Record<GAFunnelType, GAEventType[]> = {
  acquisition: ["first_visit", "session_start", "page_view"],
  engagement: ["scroll", "user_engagement", "form_start", "step_change"],
  product_configuration: [
    "select_item",
    "color_select",
    "size_select",
    "stamp_image_upload",
    "stamp_create_product",
  ],
  generation: [
    "stamp_generate_start",
    "stamp_generate_complete",
    "stamp_generate_failed",
  ],
  ecommerce: [
    "view_cart",
    "add_to_cart",
    "remove_from_cart",
    "begin_checkout",
    "purchase",
  ],
  authentication: ["login", "logout"],
};
