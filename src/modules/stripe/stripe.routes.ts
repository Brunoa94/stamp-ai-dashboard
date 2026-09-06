import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {
  getStripeBalanceSchema,
  getStripeInvoicesSchema,
} from "./stripe.schema.js";
import { StripeController } from "./stripe.controller.js";

async function stripeProviderRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/",
      { schema: getStripeBalanceSchema },
      StripeController.getBalanceProvider,
    );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/invoices",
      { schema: getStripeInvoicesSchema },
      StripeController.getInvoicesProvider,
    );
}

export default stripeProviderRoutes;
