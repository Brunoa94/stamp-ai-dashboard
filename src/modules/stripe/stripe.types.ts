import { Static } from "@fastify/type-provider-typebox";
import {
  GetStripeTransactionsQuerySchema,
  StripeBalanceSchema,
  StripeInvoicesSchema,
  StripeTransactionsSchema,
} from "./stripe.schema.js";

export type StripeBalanceType = Static<typeof StripeBalanceSchema>;
export type StripeBalanceResponseType = StripeBalanceType & {
  updated_at: string;
};

export type StripeInvoicesResponseType = Static<typeof StripeInvoicesSchema>;
export type StripeTransactionsResponseType = Static<typeof StripeTransactionsSchema>;
export type GetStripeTransactionsQueryType = Static<
  typeof GetStripeTransactionsQuerySchema
>;
