import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

const createInvoiceMapper = (body: CreateInvoiceType): InvoiceType => ({
  id: 0,
  name: body.name ?? null,
  amount: body.amount ?? null,
  paymentProviderName: body.paymentProviderName,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const InvoiceMapper = { createInvoiceMapper };
