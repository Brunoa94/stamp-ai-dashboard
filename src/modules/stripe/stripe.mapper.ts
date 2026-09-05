import {
  StripeBalanceResponseType,
  StripeBalanceType,
} from "./stripe.types.js";

const stripeBalanceMapper = (
  response: StripeBalanceType,
): StripeBalanceResponseType => ({
  ...response,
  updated_at: new Date().toISOString(),
});

export const StripeMapper = { stripeBalanceMapper };
