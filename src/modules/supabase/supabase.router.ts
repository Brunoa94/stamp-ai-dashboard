import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {
  getAllOrdersSchema,
  getOrdersByFiltersSchema,
} from "./supabase.schema.js";
import { SupabaseController } from "./supabase.controller.js";

async function databaseProviderRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/orders",
      { schema: getAllOrdersSchema },
      SupabaseController.getAllOrders,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/orders/filtered",
      { schema: getOrdersByFiltersSchema },
      SupabaseController.getOrdersByFilters,
    );
}

export default databaseProviderRoutes;
