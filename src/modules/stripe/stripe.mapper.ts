import {
  StripeBalanceResponseType,
  StripeBalanceType,
  StripeInvoicesResponseType,
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

export const StripeMapper = { stripeBalanceMapper, stripeInvoicesMapper };
