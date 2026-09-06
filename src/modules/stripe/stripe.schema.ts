import { Type } from "@fastify/type-provider-typebox";

// Matches Stripe.Balance.Available.SourceTypes
const SourceTypesSchema = Type.Object({
  bank_account: Type.Optional(
    Type.Number({ description: "Amount from bank account source" }),
  ),
  card: Type.Optional(Type.Number({ description: "Amount from card source" })),
  fpx: Type.Optional(Type.Number({ description: "Amount from FPX source" })),
});

// Matches Stripe.Balance.Available (and Pending, ConnectReserved, etc.)
const BalanceAmountSchema = Type.Object({
  amount: Type.Number({ description: "Amount in the smallest currency unit" }),
  currency: Type.String({ description: "Currency code", examples: ["usd"] }),
  source_types: Type.Optional(SourceTypesSchema),
});

// Matches Stripe.Balance interface
export const StripeBalanceSchema = Type.Object({
  object: Type.Literal("balance", {
    description: "Stripe object type",
  }),
  available: Type.Array(BalanceAmountSchema),
  pending: Type.Array(BalanceAmountSchema),
  livemode: Type.Boolean({ description: "True when running in live mode" }),
  connect_reserved: Type.Optional(Type.Array(BalanceAmountSchema)),
  instant_available: Type.Optional(Type.Array(BalanceAmountSchema)),
});

export const getStripeBalanceSchema = {
  tags: ["Stripe"],
  summary: "Get Stripe balance",
  description: "Returns current Stripe account balance details.",
  operationId: "getStripeBalance",
  security: [{ bearerAuth: [] }],
  response: {
    200: StripeBalanceSchema,
  },
};

const StripeInvoiceSchema = Type.Object({
  id: Type.String(),
  number: Type.Union([Type.String(), Type.Null()]),
  customer: Type.Union([Type.String(), Type.Null()]),
  customer_email: Type.Union([Type.String(), Type.Null()]),
  status: Type.Union([Type.String(), Type.Null()]),
  currency: Type.String(),
  subtotal: Type.Number(),
  total: Type.Number(),
  amount_paid: Type.Number(),
  amount_due: Type.Number(),
  created: Type.Number(),
  hosted_invoice_url: Type.Union([Type.String(), Type.Null()]),
  invoice_pdf: Type.Union([Type.String(), Type.Null()]),
});

export const StripeInvoicesSchema = Type.Object({
  object: Type.Literal("list"),
  url: Type.String(),
  has_more: Type.Boolean(),
  data: Type.Array(StripeInvoiceSchema),
  updated_at: Type.String({ format: "date-time" }),
});

export const getStripeInvoicesSchema = {
  tags: ["Stripe"],
  summary: "Get Stripe invoices",
  description: "Returns all Stripe invoices.",
  operationId: "getStripeInvoices",
  security: [{ bearerAuth: [] }],
  response: {
    200: StripeInvoicesSchema,
  },
};
