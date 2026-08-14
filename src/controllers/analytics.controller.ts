import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorType } from "../types/shared.js";
import { AnalyticsService } from "../services/analytics.service.js";
import type { AnalyticsEventNameT } from "../types/analytics.js";
import type {
  DateRangeQuery,
  EventNameParams,
} from "../schemas/analytics.schema.js";

async function getPageViewEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getPageViewEvents(startDate, endDate);
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get page view events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get page view events" });
  }
}

async function getStepChangeEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getStepChangeEvents(
      startDate,
      endDate,
    );

    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get step change events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get step change events" });
  }
}

async function getColorSelectEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getColorSelectEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get color select events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get color select events" });
  }
}

async function getSizeSelectEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getSizeSelectEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get size select events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get size select events" });
  }
}

async function getPurchaseEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getPurchaseEvents(startDate, endDate);
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get purchase events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get purchase events" });
  }
}

async function getEventsByName(
  request: FastifyRequest<{
    Params: EventNameParams;
    Querystring: DateRangeQuery;
  }>,
  reply: FastifyReply,
) {
  try {
    const { eventName } = request.params;
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getEventsByName(
      eventName as AnalyticsEventNameT,
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get events by name");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get events" });
  }
}

async function getImageUploadEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getImageUploadEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get image upload events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get image upload events" });
  }
}

async function getGenerateStartEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getGenerateStartEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get generate start events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get generate start events" });
  }
}

async function getGenerateCompleteEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getGenerateCompleteEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get generate complete events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get generate complete events" });
  }
}

async function getGenerateFailedEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getGenerateFailedEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get generate failed events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get generate failed events" });
  }
}

async function getCreateProductEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getCreateProductEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get create product events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get create product events" });
  }
}

async function getSelectItemEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getSelectItemEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get select item events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get select item events" });
  }
}

async function getAddToCartEvents(
  request: FastifyRequest<{ Querystring: DateRangeQuery }>,
  reply: FastifyReply,
) {
  try {
    const { startDate, endDate } = request.query;
    const events = await AnalyticsService.getAddToCartEvents(
      startDate,
      endDate,
    );
    return reply.status(200).send(events);
  } catch (e) {
    request.log.error({ err: e }, "Failed to get add to cart events");
    const error = e as ErrorType;
    return reply
      .code(error.status ?? 500)
      .send({ error: error.error ?? "Failed to get add to cart events" });
  }
}

export const AnalyticsController = {
  getPageViewEvents,
  getStepChangeEvents,
  getColorSelectEvents,
  getSizeSelectEvents,
  getPurchaseEvents,
  getEventsByName,
  getImageUploadEvents,
  getGenerateStartEvents,
  getGenerateCompleteEvents,
  getGenerateFailedEvents,
  getCreateProductEvents,
  getSelectItemEvents,
  getAddToCartEvents,
};
