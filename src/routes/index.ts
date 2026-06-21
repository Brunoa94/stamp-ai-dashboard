import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as healthController from "../controllers/health.controller.js";
import healthSchema from "../schemas/health.schema.js";

import {
  createInvoiceSchema,
  getAllInvoicesSchema,
} from "../schemas/invoice.schema.js";
import * as InvoiceController from "../controllers/invoices.controller.js";

async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get("/health", { schema: healthSchema }, healthController.getHealth);

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/invoices",
      { schema: getAllInvoicesSchema },
      InvoiceController.getAllInvoices,
    );
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/invoices",
      { schema: createInvoiceSchema },
      InvoiceController.createInvoice,
    );
}

export default routes;
