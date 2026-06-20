import { InvoiceType } from "../types/invoices";
import { GlobalResponseType } from "../types/shared";

function getAllInvoices(): GlobalResponseType<InvoiceType> {
  return { status: 200, body: { title: "Test invoice", amount: 200 } };
}

export const InvoicesService = {
  getAllInvoices,
};
