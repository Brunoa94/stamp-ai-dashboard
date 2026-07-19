import { Type } from "@fastify/type-provider-typebox";

type PaymentMethodsType = "stripe" | "paypal";

export const InvoiceSchema = Type.Object({
  id: Type.Number({
    description: "Invoice unique identifier",
  }),
  name: Type.Union(
    [
      Type.String({
        description: "Invoice display name",
      }),
      Type.Null(),
    ],
    { description: "Invoice name" },
  ),
  amount: Type.Union(
    [
      Type.Number({
        description: "Invoice amount in cents",
      }),
      Type.Null(),
    ],
    { description: "Invoice amount" },
  ),
  payment_provider_name: Type.Union(
    [Type.Literal("stripe"), Type.Literal("paypal")],
    {
      description: "Payment provider used by this invoice",
    },
  ),
  created_at: Type.String({
    format: "date-time",
    description: "Creation timestamp",
  }),
  updated_at: Type.String({
    format: "date-time",
    description: "Last update timestamp",
  }),
});

export const getAllInvoicesSchema = {
  tags: ["Invoices"],
  summary: "List invoices",
  description: "Returns all invoices.",
  operationId: "getAllInvoices",
  security: [{ bearerAuth: [] }],
  response: {
    200: Type.Array(InvoiceSchema),
  },
};

export const CreateInvoiceSchema = Type.Pick(
  InvoiceSchema,
  ["name", "amount", "payment_provider_name"],
  { additionalProperties: false },
);

export const createInvoiceSchema = {
  tags: ["Invoices"],
  summary: "Create invoice",
  description: "Creates a new invoice for a supported payment provider.",
  operationId: "createInvoice",
  security: [{ bearerAuth: [] }],
  body: CreateInvoiceSchema,
  response: {
    200: InvoiceSchema,
    400: Type.Object({
      message: Type.String({
        description: "Validation or business error message",
      }),
    }),
  },
};
