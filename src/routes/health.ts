import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as healthController from "../controllers/health.controller.js";
import healthSchema from "../schemas/health.schema.js";

async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get("/", { schema: healthSchema }, healthController.getHealth);
}

export default routes;
