import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as authController from "./auth.controller.js";
import loginSchema from "./auth.schema.js";

async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post("/login", { schema: loginSchema }, authController.authenticate);
}

export default routes;
