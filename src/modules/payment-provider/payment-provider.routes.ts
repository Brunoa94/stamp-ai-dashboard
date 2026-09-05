import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { createPaymentProviderSchema } from "./payment-provider.schema.js";
import { PaymentProviderController } from "./payment-provider.controller.js";

async function paymentProviderRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/",
      { schema: createPaymentProviderSchema },
      PaymentProviderController.createPaymentProvider,
    );
}

export default paymentProviderRoutes;
