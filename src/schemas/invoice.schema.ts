import { FastifySchema } from "fastify";
import { InvoiceSchema } from "../types/invoices";
import zodToJsonSchema from "zod-to-json-schema";

const getAllInvoicesSchema: FastifySchema = {
  response: {
    200: { body: zodToJsonSchema(InvoiceSchema) },
  },
};

export default getAllInvoicesSchema;
