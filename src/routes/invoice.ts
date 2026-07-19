import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  createInvoiceSchema,
  getAllInvoicesSchema,
} from "../schemas/invoice.schema.js";
import * as InvoiceController from "../controllers/invoices.controller.js";

async function invoiceRoute(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      "/",
      { schema: getAllInvoicesSchema },
      InvoiceController.getAllInvoices,
    );
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/",
      { schema: createInvoiceSchema },
      InvoiceController.createInvoice,
    );
}

export default invoiceRoute;
