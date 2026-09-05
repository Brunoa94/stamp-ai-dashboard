import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { getStripeBalanceSchema } from "./stripe.schema.js";
import { StripeController } from "./stripe.controller.js";

async function stripeProviderRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/",
      { schema: getStripeBalanceSchema },
      StripeController.getBalanceProvider,
    );
}

export default stripeProviderRoutes;
