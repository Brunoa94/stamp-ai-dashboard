import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyBody } from "../types/shared.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";
import { InvoicesService } from "../services/invoices.service.js";

export async function getAllInvoices() {
  return InvoicesService.getAllInvoices();
}

export async function createInvoice(
  request: FastifyRequest<FastifyBody<CreateInvoiceType>>,
  reply: FastifyReply,
) {
  const createdInvoice = InvoicesService.createInvoice(request.body);

  return reply.status(200).send(createdInvoice);
}
