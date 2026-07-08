import { FastifyReply, FastifyRequest } from "fastify";
import { StripeService } from "../services/stripe.service.js";
import { ErrorType } from "../types/shared.js";

async function getBalanceProvider(_: FastifyRequest, reply: FastifyReply) {
  try {
    const balance = await StripeService.getBalance();

    return reply.code(200).send(balance);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const StripeController = { getBalanceProvider };
