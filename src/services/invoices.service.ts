import { prisma } from "../lib/prisma.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { InvoiceMapper } from "../mappers/invoice.mapper.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

function getAllInvoices(): InvoiceType[] {
  return [
    {
      id: 1,
      name: "Test invoice",
      amount: 200,
      paymentProviderName: "stripe",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

async function createInvoice(body: CreateInvoiceType): Promise<InvoiceType> {
  try {
    const createdInvoice = await prisma.invoice.create({
      data: body,
    });

    return InvoiceMapper.createInvoiceMapperResponse(createdInvoice);
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_INVOICES",
      description: "Failed to create invoice",
    });
  }
}

export const InvoicesService = {
  getAllInvoices,
  createInvoice,
};
