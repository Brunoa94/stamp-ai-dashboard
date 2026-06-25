import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

const createInvoiceMapper = (body: CreateInvoiceType): InvoiceType => ({
  title: body.title,
  amount: body.amount,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  id: "",
});

export const InvoiceMapper = { createInvoiceMapper };
