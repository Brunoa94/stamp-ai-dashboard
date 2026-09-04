import { AnalyticsAgentMapper } from "../mappers/analytics-agent.mapper.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import {
  GA_EVENTS_BY_FUNNEL,
  GAEventType,
  GAFunnelType,
  RequestAnalyticsType,
} from "../types/analytics-agents.js";

function getEventsFromFunnels(funnels: GAFunnelType[]): GAEventType[] {
  return Array.from(
    new Set(funnels.flatMap((funnel) => GA_EVENTS_BY_FUNNEL[funnel])),
  );
}

async function retrieveAnalyticsData({
  funnels,
  start_date,
  end_date,
}: RequestAnalyticsType) {
  try {
    const selectedEvents = Array.from(
      new Set([...getEventsFromFunnels(funnels ?? [])]),
    );
    console.log("Selected: ", funnels);
    const analyticsResults = await Promise.all(
      selectedEvents.map((event: GAEventType) =>
        AnalyticsAgentMapper.fromGAEventToService[event](start_date, end_date),
      ),
    );

    return analyticsResults.flat();
  } catch (e) {
    console.error(e);
    throw ErrorMapper.Create({
      status: 500,
      service: "ANALYTICS_AGENTS_SERVICE",
      description: "Failed to retrieve analytics data",
    });
  }
}

export const AnalyticsAgentService = { retrieveAnalyticsData };
