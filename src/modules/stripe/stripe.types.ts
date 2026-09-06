import { Static } from "@fastify/type-provider-typebox";
import { StripeBalanceSchema, StripeInvoicesSchema } from "./stripe.schema.js";

export type StripeBalanceType = Static<typeof StripeBalanceSchema>;
export type StripeBalanceResponseType = StripeBalanceType & {
  updated_at: string;
};

export type StripeInvoicesResponseType = Static<typeof StripeInvoicesSchema>;
