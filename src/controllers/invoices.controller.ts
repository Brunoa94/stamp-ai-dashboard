import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorType, FastifyBody } from "../types/shared.js";
import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";
import { InvoicesService } from "../services/invoices.service.js";

export async function getAllInvoices() {
  return InvoicesService.getAllInvoices();
}

export async function createInvoice(
  request: FastifyRequest<FastifyBody<CreateInvoiceType>>,
  reply: FastifyReply,
) {
  try {
    const createdInvoice = await InvoicesService.createInvoice(request.body);

    return reply.status(200).send(createdInvoice);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}
