import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { AnalyticsAgentController } from "../controllers/analytics-agent.controller.js";
import { createAnalysisSchema } from "../schemas/analytics-agents.schema.js";

async function analyticsAgentRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/analytics-agent-review",
      { schema: createAnalysisSchema },
      AnalyticsAgentController.getAnalyticsReview,
    );
}

export default analyticsAgentRoutes;
