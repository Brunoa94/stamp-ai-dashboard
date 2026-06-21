import { InvoiceSchema, CreateInvoiceSchema } from "../types/invoices.js";

export const getAllInvoicesSchema = {
  response: {
    200: InvoiceSchema,
  },
};

export const createInvoiceSchema = {
  body: CreateInvoiceSchema,
  response: {
    200: InvoiceSchema,
  },
};
