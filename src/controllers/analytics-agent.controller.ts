import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorType, FastifyBody } from "../types/shared.js";
import { AnalyticsAgentService } from "../services/analytics-agent.service.js";
import { RequestAnalyticsType } from "../types/analytics-agents.js";

async function getAnalyticsReview(
  request: FastifyRequest<FastifyBody<RequestAnalyticsType>>,
  reply: FastifyReply,
) {
  try {
    const { start_date, end_date, funnels } = request.body;
    const eventsResult = await AnalyticsAgentService.retrieveAnalyticsData({
      funnels,
      start_date,
      end_date,
    });

    return reply.status(200).send(eventsResult);
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
