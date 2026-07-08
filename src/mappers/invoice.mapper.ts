import { InvoiceModel } from "../../generated/prisma/models/Invoice.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

const createInvoiceMapper = (body: CreateInvoiceType): InvoiceType => ({
  id: 0,
  name: body.name ?? null,
  amount: body.amount ?? null,
  paymentProviderName: body.paymentProviderName,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const createInvoiceMapperResponse = (body: InvoiceModel) => ({
  ...body,
  paymentProviderName:
    body.paymentProviderName as InvoiceType["paymentProviderName"],
  created_at: body.created_at.toISOString(),
  updated_at: body.updated_at.toISOString(),
});

export const InvoiceMapper = {
  createInvoiceMapper,
  createInvoiceMapperResponse,
};
