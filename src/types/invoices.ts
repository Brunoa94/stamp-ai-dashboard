import { z } from "zod";

export const InvoiceSchema = z.object({
  title: z.string(),
  amount: z.number(),
});

export type InvoiceType = z.infer<typeof InvoiceSchema>;
