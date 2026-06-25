import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as healthController from "../controllers/health.controller.js";
import healthSchema from "../schemas/health.schema.js";

async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get("/", { schema: healthSchema }, healthController.getHealth);
}

export default routes;
