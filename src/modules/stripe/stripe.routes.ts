import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {
  getStripeBalanceSchema,
  getStripeInvoicesSchema,
  getStripeTransactionsSchema,
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

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/transactions",
      { schema: getStripeTransactionsSchema },
      StripeController.getTransactionsProvider,
    );
}

export default stripeProviderRoutes;
