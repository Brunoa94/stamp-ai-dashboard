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
      payment_provider_name: "stripe",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

async function createInvoice(body: CreateInvoiceType): Promise<InvoiceType> {
  try {
    const createdInvoice = await prisma.invoice.create({
      data: InvoiceMapper.createInvoiceMapper(body),
    });

    return InvoiceMapper.createInvoiceMapperResponse(createdInvoice);
  } catch (e) {
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
