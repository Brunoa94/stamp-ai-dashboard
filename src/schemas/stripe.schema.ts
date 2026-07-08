import { Type } from "@fastify/type-provider-typebox";

// Matches Stripe.Balance.Available.SourceTypes
const SourceTypesSchema = Type.Object({
  bank_account: Type.Optional(Type.Number()),
  card: Type.Optional(Type.Number()),
  fpx: Type.Optional(Type.Number()),
});

// Matches Stripe.Balance.Available (and Pending, ConnectReserved, etc.)
const BalanceAmountSchema = Type.Object({
  amount: Type.Number(),
  currency: Type.String(),
  source_types: Type.Optional(SourceTypesSchema),
});

// Matches Stripe.Balance interface
export const StripeBalanceSchema = Type.Object({
  object: Type.Literal("balance"),
  available: Type.Array(BalanceAmountSchema),
  pending: Type.Array(BalanceAmountSchema),
  livemode: Type.Boolean(),
  connect_reserved: Type.Optional(Type.Array(BalanceAmountSchema)),
  instant_available: Type.Optional(Type.Array(BalanceAmountSchema)),
});

export const getStripeBalanceSchema = {
  response: {
    200: StripeBalanceSchema,
  },
};
