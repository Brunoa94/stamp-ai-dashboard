import { z } from "zod";

export const InvoiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateInvoiceSchema = InvoiceSchema.pick({
  title: true,
  amount: true,
});

export type InvoiceType = z.infer<typeof InvoiceSchema>;
export type CreateInvoiceType = z.infer<typeof CreateInvoiceSchema>;
