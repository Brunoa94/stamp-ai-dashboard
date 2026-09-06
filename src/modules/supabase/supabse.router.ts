import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { getAllOrdersSchema } from "./supabase.schema.js";
import { SupabaseController } from "./supabase.controller.js";

async function databaseProviderRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/orders",
      { schema: getAllOrdersSchema },
      SupabaseController.getAllOrders,
    );
}

export default databaseProviderRoutes;
