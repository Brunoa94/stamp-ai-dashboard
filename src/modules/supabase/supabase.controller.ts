import { FastifyReply, FastifyRequest } from "fastify";
import { SupabaseService } from "./supabase.service.js";
import { ErrorType } from "../../shared/types/shared.js";
import { GetOrdersFiltersType } from "./supabase.types.js";

async function getAllOrders(_: FastifyRequest, reply: FastifyReply) {
  try {
    const orders = await SupabaseService.getAllOrders();

    return reply.code(200).send(orders);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

async function getOrdersByFilters(
  request: FastifyRequest<{ Querystring: GetOrdersFiltersType }>,
  reply: FastifyReply,
) {
  try {
    const orders = await SupabaseService.getOrdersByFilters(request.query);

    return reply.code(200).send(orders);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const SupabaseController = {
  getAllOrders,
  getOrdersByFilters,
};
