import { FastifyInstance } from "fastify";
import * as healthController from "../controllers/health.controller";
import healthSchema from "../schemas/health.schema";
import getAllInvoicesSchema from "../schemas/invoice.schema";
import { InvoicesService } from "../services/invoices.service";

async function routes(fastify: FastifyInstance) {
  fastify.get("/health", { schema: healthSchema }, healthController.getHealth);
  fastify.get(
    "/invoices",
    { schema: getAllInvoicesSchema },
    InvoicesService.getAllInvoices,
  );
}

export default routes;
