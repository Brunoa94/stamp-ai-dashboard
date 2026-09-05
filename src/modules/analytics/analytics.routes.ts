import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { AnalyticsController } from "./analytics.controller.js";
import {
  getPageViewEventsSchema,
  getStepChangeEventsSchema,
  getColorSelectEventsSchema,
  getSizeSelectEventsSchema,
  getPurchaseEventsSchema,
  getEventsByNameSchema,
  getImageUploadEventsSchema,
  getGenerateStartEventsSchema,
  getGenerateCompleteEventsSchema,
  getGenerateFailedEventsSchema,
  getCreateProductEventsSchema,
  getSelectItemEventsSchema,
  getAddToCartEventsSchema,
} from "./analytics.schema.js";

async function analyticsRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/page-views",
      { schema: getPageViewEventsSchema },
      AnalyticsController.getPageViewEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/step-changes",
      { schema: getStepChangeEventsSchema },
      AnalyticsController.getStepChangeEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/color-selects",
      { schema: getColorSelectEventsSchema },
      AnalyticsController.getColorSelectEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/size-selects",
      { schema: getSizeSelectEventsSchema },
      AnalyticsController.getSizeSelectEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/purchases",
      { schema: getPurchaseEventsSchema },
      AnalyticsController.getPurchaseEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/events/:eventName",
      { schema: getEventsByNameSchema },
      AnalyticsController.getEventsByName,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/image-uploads",
      { schema: getImageUploadEventsSchema },
      AnalyticsController.getImageUploadEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/generate-starts",
      { schema: getGenerateStartEventsSchema },
      AnalyticsController.getGenerateStartEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/generate-completes",
      { schema: getGenerateCompleteEventsSchema },
      AnalyticsController.getGenerateCompleteEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/generate-failures",
      { schema: getGenerateFailedEventsSchema },
      AnalyticsController.getGenerateFailedEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/create-products",
      { schema: getCreateProductEventsSchema },
      AnalyticsController.getCreateProductEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/select-items",
      { schema: getSelectItemEventsSchema },
      AnalyticsController.getSelectItemEvents,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/add-to-carts",
      { schema: getAddToCartEventsSchema },
      AnalyticsController.getAddToCartEvents,
    );
}

export default analyticsRoutes;
