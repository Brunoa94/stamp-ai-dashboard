import { Type } from "@fastify/type-provider-typebox";

export const InvoiceSchema = Type.Object({
  id: Type.Number(),
  name: Type.Union([Type.String(), Type.Null()]),
  amount: Type.Union([Type.Number(), Type.Null()]),
  paymentProviderName: Type.String(),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

export const getAllInvoicesSchema = {
  response: {
    200: Type.Array(InvoiceSchema),
  },
};

export const CreateInvoiceSchema = Type.Omit(
  InvoiceSchema,
  ["id", "created_at", "updated_at"],
  {
    additionalProperties: false,
  },
);

export const createInvoiceSchema = {
  body: CreateInvoiceSchema,
  response: {
    200: InvoiceSchema,
  },
};
