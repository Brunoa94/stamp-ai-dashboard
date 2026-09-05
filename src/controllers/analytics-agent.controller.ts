import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorType, FastifyBody } from "../types/shared.js";
import { AnalyticsAgentService } from "../services/analytics-agent.service.js";
import { RequestAnalyticsType } from "../types/analytics-agents.js";
import { ClaudeService } from "../services/claude.service.js";
import { GetAnalyticsReviewPrompt } from "../prompts/get-analytics-review.js";
import { AnalyticsFunnelT } from "../types/analytics.js";

async function getAnalyticsReview(
  request: FastifyRequest<FastifyBody<RequestAnalyticsType>>,
  reply: FastifyReply,
) {
  try {
    const { start_date, end_date, funnels } = request.body;

    const mapFunnels = funnels.map((funnel: AnalyticsFunnelT) =>
      AnalyticsAgentService.retrieveAnalyticsData({
        funnels: [funnel],
        start_date,
        end_date,
      }),
    );

    const funnelsResults = await Promise.all(mapFunnels.flat());

    const mapResults = funnelsResults.map(async (result, index) => {
      const response = await ClaudeService.sendPrompt({
        content: GetAnalyticsReviewPrompt(JSON.stringify(result)),
      });

      return {
        ...response,
        gaEvent: funnels[index],
      };
    });

    const reviewResults = await Promise.all(mapResults);

    return reply.status(200).send(reviewResults);
  } catch (e) {
    request.log.error(
      { err: e },
      "Failed to get analytics analyzed by the agent",
    );
    const error = e as ErrorType;

    return reply.code(error.status ?? 500).send({
      error: error.error ?? "Failed to get analytics review from the agent",
    });
  }
}

export const AnalyticsAgentController = { getAnalyticsReview };
