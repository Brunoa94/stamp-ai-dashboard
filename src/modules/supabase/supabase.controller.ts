import { FastifyReply, FastifyRequest } from "fastify";
import { SupabaseService } from "./supabase.service.js";
import { ErrorType } from "../../shared/types/shared.js";
import {
  GetInvoicesFiltersType,
  GetOrdersFiltersType,
} from "./supabase.types.js";

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

async function getAllInvoices(_: FastifyRequest, reply: FastifyReply) {
  try {
    const invoices = await SupabaseService.getAllInvoices();

    return reply.code(200).send(invoices);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

async function getInvoicesByFilters(
  request: FastifyRequest<{ Querystring: GetInvoicesFiltersType }>,
  reply: FastifyReply,
) {
  try {
    const invoices = await SupabaseService.getInvoicesByFilters({
      filters: request.query,
    });

    return reply.code(200).send(invoices);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const SupabaseController = {
  getAllOrders,
  getOrdersByFilters,
  getAllInvoices,
  getInvoicesByFilters,
};
