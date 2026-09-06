import {
  StripeBalanceResponseType,
  StripeBalanceType,
  StripeInvoicesResponseType,
  StripeTransactionsResponseType,
} from "./stripe.types.js";
import Stripe from "stripe";

const stripeBalanceMapper = (
  response: StripeBalanceType,
): StripeBalanceResponseType => ({
  ...response,
  updated_at: new Date().toISOString(),
});

const stripeInvoicesMapper = (
  invoices: Stripe.Invoice[],
): StripeInvoicesResponseType => ({
  object: "list",
  url: "/v1/invoices",
  has_more: false,
  updated_at: new Date().toISOString(),
  data: invoices.map((invoice) => ({
    id: invoice.id,
    number: invoice.number,
    customer: typeof invoice.customer === "string" ? invoice.customer : null,
    customer_email: invoice.customer_email ?? null,
    status: invoice.status ? String(invoice.status) : null,
    currency: invoice.currency,
    subtotal: invoice.subtotal,
    total: invoice.total,
    amount_paid: invoice.amount_paid,
    amount_due: invoice.amount_due,
    created: invoice.created,
    hosted_invoice_url: invoice.hosted_invoice_url ?? null,
    invoice_pdf: invoice.invoice_pdf ?? null,
  })),
});

const stripeTransactionsMapper = (
  transactions: Stripe.BalanceTransaction[],
): StripeTransactionsResponseType => ({
  object: "list",
  url: "/v1/balance_transactions",
  has_more: false,
  updated_at: new Date().toISOString(),
  data: transactions.map((transaction) => ({
    id: transaction.id,
    object: "balance_transaction",
    amount: transaction.amount,
    available_on: transaction.available_on,
    created: transaction.created,
    currency: transaction.currency,
    description: transaction.description ?? null,
    fee: transaction.fee,
    net: transaction.net,
    reporting_category: transaction.reporting_category,
    source: typeof transaction.source === "string" ? transaction.source : null,
    status: transaction.status,
    type: transaction.type,
  })),
});

export const StripeMapper = {
  stripeBalanceMapper,
  stripeInvoicesMapper,
  stripeTransactionsMapper,
};
