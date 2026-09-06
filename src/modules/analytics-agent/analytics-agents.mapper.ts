import { AnalyticsAnalysisModel } from "../../../generated/prisma/models/AnalyticsAnalysis.js";
import { AnalyticsRecommendationModel } from "../../../generated/prisma/models/AnalyticsRecommendation.js";
import {
  AnalyticsAnalysisType,
  AnalyticsRecommendationType,
  AnalyticsAnalysisWithRecommendationsType,
  CreateAnalyticsRecommendationType,
} from "./analytics-agents.types.js";

// ============================================
// AnalyticsAnalysis Mappers
// ============================================

const toAnalysisResponse = (
  model: AnalyticsAnalysisModel,
): AnalyticsAnalysisType => ({
  id: model.id,
  analysis_type: model.analysis_type,
  start_date: model.start_date,
  end_date: model.end_date,
  raw_analytics_data: model.raw_analytics_data,
  analysis_result: model.analysis_result,
  model_used: model.model_used,
  tokens_used: model.tokens_used ?? undefined,
  processing_time_ms: model.processing_time_ms ?? undefined,
  status: model.status,
  error_message: model.error_message ?? undefined,
  created_at: model.created_at.toISOString(),
  updated_at: model.updated_at.toISOString(),
});

const toAnalysisWithRecommendationsResponse = (
  model: AnalyticsAnalysisModel & {
    recommendations: AnalyticsRecommendationModel[];
  },
): AnalyticsAnalysisWithRecommendationsType => ({
  ...toAnalysisResponse(model),
  recommendations: model.recommendations.map(toRecommendationResponse),
});

// ============================================
// AnalyticsRecommendation Mappers
// ============================================

const toRecommendationResponse = (
  model: AnalyticsRecommendationModel,
): AnalyticsRecommendationType => ({
  id: model.id,
  analysis_id: model.analysis_id,
  category: model.category,
  priority: model.priority,
  title: model.title,
  description: model.description,
  expected_impact: model.expected_impact ?? undefined,
  implemented: model.implemented,
  implemented_at: model.implemented_at?.toISOString(),
  created_at: model.created_at.toISOString(),
});

const toRecommendationCreateInput = (
  body: CreateAnalyticsRecommendationType,
) => ({
  analysis_id: body.analysis_id,
  category: body.category,
  priority: body.priority,
  title: body.title,
  description: body.description,
  expected_impact: body.expected_impact,
  implemented: body.implemented ?? false,
  implemented_at: body.implemented_at ? new Date(body.implemented_at) : null,
});

// ============================================
// Export Mapper Objects
// ============================================

export const AnalyticsAnalysisMapper = {
  toAnalysisResponse,
  toAnalysisWithRecommendationsResponse,
};

export const AnalyticsRecommendationMapper = {
  toRecommendationResponse,
  toRecommendationCreateInput,
};
