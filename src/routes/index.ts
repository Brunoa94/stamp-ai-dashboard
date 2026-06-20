import { FastifyInstance } from "fastify";
import * as healthController from "../controllers/health.controller.js";
import healthSchema from "../schemas/health.schema.js";
import getAllInvoicesSchema from "../schemas/invoice.schema.js";
import { InvoicesService } from "../services/invoices.service.js";
import { PoolClient, QueryResult } from "pg";

async function routes(fastify: FastifyInstance) {
  fastify.get("/health", { schema: healthSchema }, healthController.getHealth);
  fastify.get(
    "/invoices",
    { schema: getAllInvoicesSchema },
    InvoicesService.getAllInvoices,
  );
}

export default routes;
