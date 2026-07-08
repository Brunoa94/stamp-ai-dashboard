import { Type } from "@fastify/type-provider-typebox";

type PaymentMethodsType = "stripe" | "paypal";

export const InvoiceSchema = Type.Object({
  id: Type.Number(),
  name: Type.Union([Type.String(), Type.Null()]),
  amount: Type.Union([Type.Number(), Type.Null()]),
  paymentProviderName: Type.Union([
    Type.Literal("stripe"),
    Type.Literal("paypal"),
  ]),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

export const getAllInvoicesSchema = {
  response: {
    200: Type.Array(InvoiceSchema),
  },
};

export const CreateInvoiceSchema = Type.Pick(
  InvoiceSchema,
  ["name", "amount", "paymentProviderName"],
  { additionalProperties: false },
);

export const createInvoiceSchema = {
  body: CreateInvoiceSchema,
  response: {
    200: InvoiceSchema,
  },
};
