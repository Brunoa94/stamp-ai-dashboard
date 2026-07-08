import { Static } from "@fastify/type-provider-typebox";
import { StripeBalanceSchema } from "../schemas/stripe.schema.js";

export type StripeBalanceType = Static<typeof StripeBalanceSchema>;
export type StripeBalanceResponseType = StripeBalanceType & {
  updated_at: string;
};
