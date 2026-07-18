import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as authController from "../controllers/auth.controller.js";
import loginSchema from "../schemas/auth.schema.js";

async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post("/login", { schema: loginSchema }, authController.authenticate);
}

export default routes;
