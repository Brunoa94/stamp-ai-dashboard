import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  createAdminSchema,
  getAllAdminsSchema,
} from "./admin.schema.js";
import { AdminController } from "./admin.controller.js";

async function adminRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get("/", { schema: getAllAdminsSchema }, AdminController.getAllAdmins);
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/",
      { schema: createAdminSchema, onRequest: [fastify.authenticate] },
      AdminController.createAdmin,
    );
}

export default adminRoutes;
