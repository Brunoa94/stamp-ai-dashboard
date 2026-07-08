import { InvoiceModel } from "../../generated/prisma/models/Invoice.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

const createInvoiceMapper = (body: CreateInvoiceType): InvoiceType => ({
  id: 0,
  name: body.name ?? null,
  amount: body.amount ?? null,
  payment_provider_name: body.payment_provider_name,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const createInvoiceMapperResponse = (body: InvoiceModel): InvoiceType => ({
  ...body,
  payment_provider_name:
    body.payment_provider_name as InvoiceType["payment_provider_name"],
  created_at: body.created_at,
  updated_at: body.updated_at,
});

export const InvoiceMapper = {
  createInvoiceMapper,
  createInvoiceMapperResponse,
};
