import { ErrorMapper } from "../mappers/error.mapper.js";
import { InvoiceMapper } from "../mappers/invoice.mapper.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

function getAllInvoices(): InvoiceType[] {
  return [
    {
      id: 1,
      name: "Test invoice",
      amount: 200,
      paymentProviderName: "Stripe",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

function createInvoice(body: CreateInvoiceType): InvoiceType {
  try {
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_INVOICES",
      description: "Failed to create invoice",
    });
  }

  return InvoiceMapper.createInvoiceMapper(body);
}

export const InvoicesService = {
  getAllInvoices,
  createInvoice,
};
