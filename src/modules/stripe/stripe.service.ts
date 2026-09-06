import { stripe } from "./stripe.lib.js";
import { ErrorMapper } from "../../shared/mappers/error.mapper.js";
import { StripeMapper } from "./stripe.mapper.js";
import {
  GetStripeTransactionsQueryType,
  StripeBalanceResponseType,
  StripeInvoicesResponseType,
  StripeTransactionsResponseType,
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

function matchesLocalTransactionFilters(
  transaction: Stripe.BalanceTransaction,
  filters: GetStripeTransactionsQueryType,
): boolean {
  if (
    filters.available_on_from !== undefined &&
    transaction.available_on < filters.available_on_from
  ) {
    return false;
  }

  if (
    filters.available_on_to !== undefined &&
    transaction.available_on > filters.available_on_to
  ) {
    return false;
  }

  if (filters.status && transaction.status !== filters.status) {
    return false;
  }

  if (
    filters.reporting_category &&
    transaction.reporting_category !== filters.reporting_category
  ) {
    return false;
  }

  if (filters.description) {
    const query = filters.description.toLowerCase();
    const transactionDescription = (transaction.description ?? "").toLowerCase();

    if (!transactionDescription.includes(query)) {
      return false;
    }
  }

  return true;
}

async function getTransactions(
  filters: GetStripeTransactionsQueryType,
): Promise<StripeTransactionsResponseType> {
  try {
    const allTransactions: Stripe.BalanceTransaction[] = [];
    let startingAfter: string | undefined;
    const maxItems = filters.limit;
    const createdFilter =
      filters.created_from !== undefined || filters.created_to !== undefined
        ? {
            ...(filters.created_from !== undefined
              ? { gte: filters.created_from }
              : {}),
            ...(filters.created_to !== undefined ? { lte: filters.created_to } : {}),
          }
        : undefined;

    while (true) {
      const page = await stripe.balanceTransactions.list({
        limit: 100,
        ...(filters.currency ? { currency: filters.currency.toLowerCase() } : {}),
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.payout ? { payout: filters.payout } : {}),
        ...(filters.source ? { source: filters.source } : {}),
        ...(createdFilter ? { created: createdFilter } : {}),
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      const filteredData = page.data.filter((transaction) =>
        matchesLocalTransactionFilters(transaction, filters),
      );

      allTransactions.push(...filteredData);

      if (maxItems && allTransactions.length >= maxItems) {
        break;
      }

      if (!page.has_more || page.data.length === 0) {
        break;
      }

      startingAfter = page.data[page.data.length - 1]?.id;

      if (!startingAfter) {
        break;
      }
    }

    return StripeMapper.stripeTransactionsMapper(
      maxItems ? allTransactions.slice(0, maxItems) : allTransactions,
    );
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "STRIPE_PROVIDER",
      description: "Failed to get transactions",
    });
  }
}

export const StripeService = { getBalance, getInvoices, getTransactions };
