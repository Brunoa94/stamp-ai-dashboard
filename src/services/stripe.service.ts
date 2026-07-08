import { stripe } from "../lib/stripe.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { StripeMapper } from "../mappers/stripe.mapper.js";
import {
  StripeBalanceResponseType,
  StripeBalanceType,
} from "../types/stripe.js";

async function getBalance(): Promise<StripeBalanceResponseType | null> {
  try {
    const response = await stripe.balance.retrieve();

    return StripeMapper.stripeBalanceMapper(response);
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "STRIPE_PROVIDER",
      description: "Failed to get balance",
    });
  }
}

export const StripeService = { getBalance };
