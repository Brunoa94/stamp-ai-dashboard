import { Static } from "@fastify/type-provider-typebox";
import {
  CreateInvoiceSchema,
  InvoiceSchema,
} from "../schemas/invoice.schema.js";

export type InvoiceType = Static<typeof InvoiceSchema>;
export type CreateInvoiceType = Static<typeof CreateInvoiceSchema>;
