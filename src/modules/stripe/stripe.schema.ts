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

const StripeTransactionSchema = Type.Object({
  id: Type.String(),
  object: Type.Literal("balance_transaction"),
  amount: Type.Number(),
  available_on: Type.Number(),
  created: Type.Number(),
  currency: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  fee: Type.Number(),
  net: Type.Number(),
  reporting_category: Type.String(),
  source: Type.Union([Type.String(), Type.Null()]),
  status: Type.String(),
  type: Type.String(),
});

export const StripeTransactionsSchema = Type.Object({
  object: Type.Literal("list"),
  url: Type.String(),
  has_more: Type.Boolean(),
  data: Type.Array(StripeTransactionSchema),
  updated_at: Type.String({ format: "date-time" }),
});

export const GetStripeTransactionsQuerySchema = Type.Object({
  type: Type.Optional(Type.String()),
  currency: Type.Optional(Type.String({ minLength: 3, maxLength: 3 })),
  payout: Type.Optional(Type.String()),
  source: Type.Optional(Type.String()),
  status: Type.Optional(Type.String()),
  reporting_category: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  created_from: Type.Optional(Type.Integer({ minimum: 0 })),
  created_to: Type.Optional(Type.Integer({ minimum: 0 })),
  available_on_from: Type.Optional(Type.Integer({ minimum: 0 })),
  available_on_to: Type.Optional(Type.Integer({ minimum: 0 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
});

export const getStripeTransactionsSchema = {
  tags: ["Stripe"],
  summary: "Get Stripe transactions",
  description:
    "Returns Stripe balance transactions with optional server-side and local filters.",
  operationId: "getStripeTransactions",
  security: [{ bearerAuth: [] }],
  querystring: GetStripeTransactionsQuerySchema,
  response: {
    200: StripeTransactionsSchema,
  },
};
