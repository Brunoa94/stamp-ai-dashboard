import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePaymentProviderType } from "../types/payment-provider.js";
import { ErrorType, FastifyBody } from "../types/shared.js";
import { PaymentProviderService } from "../services/payment-provider.service.js";

async function createPaymentProvider(
  request: FastifyRequest<FastifyBody<CreatePaymentProviderType>>,
  reply: FastifyReply,
) {
  try {
    const createdPaymentProvider =
      await PaymentProviderService.createPaymentProvider({
        body: request.body,
      });

    return reply.code(200).send(createdPaymentProvider);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const PaymentProviderController = { createPaymentProvider };
