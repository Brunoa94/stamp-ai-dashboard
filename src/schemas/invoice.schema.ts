import { Type } from "@fastify/type-provider-typebox";

export const InvoiceSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Number(),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

export const getAllInvoicesSchema = {
  response: {
    200: InvoiceSchema,
  },
};

export const CreateInvoiceSchema = Type.Omit(InvoiceSchema, ['id', 'created_at', 'updated_at'], {
  additionalProperties: false,
});

export const createInvoiceSchema = {
  body: CreateInvoiceSchema,
  response: {
    200: InvoiceSchema,
  },
};
