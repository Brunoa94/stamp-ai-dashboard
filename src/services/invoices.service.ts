import { InvoiceType } from "../types/invoices.js";
import { GlobalResponseType } from "../types/shared.js";

function getAllInvoices(): GlobalResponseType<InvoiceType> {
  return { status: 200, body: { title: "Test invoice", amount: 200 } };
}

export const InvoicesService = {
  getAllInvoices,
};
