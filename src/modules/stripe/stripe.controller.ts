import { FastifyReply, FastifyRequest } from "fastify";
import { StripeService } from "./stripe.service.js";
import { ErrorType } from "../../shared/types/shared.js";

async function getBalanceProvider(_: FastifyRequest, reply: FastifyReply) {
  try {
    const balance = await StripeService.getBalance();

    return reply.code(200).send(balance);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

async function getInvoicesProvider(_: FastifyRequest, reply: FastifyReply) {
  try {
    const invoices = await StripeService.getInvoices();

    return reply.code(200).send(invoices);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const StripeController = { getBalanceProvider, getInvoicesProvider };
