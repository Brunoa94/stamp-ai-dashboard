import { stripe } from "./stripe.lib.js";
import { ErrorMapper } from "../../shared/mappers/error.mapper.js";
import { StripeMapper } from "./stripe.mapper.js";
import { StripeBalanceResponseType } from "./stripe.types.js";

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
