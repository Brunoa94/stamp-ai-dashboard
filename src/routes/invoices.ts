import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  createInvoiceSchema,
  getAllInvoicesSchema,
} from "../schemas/invoice.schema.js";
import * as InvoiceController from "../controllers/invoices.controller.js";

async function invoiceRoute(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/",
      { schema: getAllInvoicesSchema },
      InvoiceController.getAllInvoices,
    );
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/",
      { schema: createInvoiceSchema },
      InvoiceController.createInvoice,
    );
}

export default invoiceRoute;
