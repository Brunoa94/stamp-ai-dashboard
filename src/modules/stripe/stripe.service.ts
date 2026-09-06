import { stripe } from "./stripe.lib.js";
import { ErrorMapper } from "../../shared/mappers/error.mapper.js";
import { StripeMapper } from "./stripe.mapper.js";
import {
  StripeBalanceResponseType,
  StripeInvoicesResponseType,
} from "./stripe.types.js";
import Stripe from "stripe";

async function getBalance(): Promise<StripeBalanceResponseType> {
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

async function getInvoices(): Promise<StripeInvoicesResponseType> {
  try {
    const allInvoices: Stripe.Invoice[] = [];
    let startingAfter: string | undefined;

    while (true) {
      const page = await stripe.invoices.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      allInvoices.push(...page.data);

      if (!page.has_more || page.data.length === 0) {
        break;
      }

      startingAfter = page.data[page.data.length - 1]?.id;

      if (!startingAfter) {
        break;
      }
    }

    return StripeMapper.stripeInvoicesMapper(allInvoices);
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "STRIPE_PROVIDER",
      description: "Failed to get invoices",
    });
  }
}

export const StripeService = { getBalance, getInvoices };
