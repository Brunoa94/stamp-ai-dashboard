import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";

function getAllInvoices(): InvoiceType {
  return {
    title: "Test invoice",
    amount: 200,
    created_at: new Date(),
    updated_at: new Date(),
    id: "",
  };
}

function createInvoice(body: CreateInvoiceType): InvoiceType {
  return {
    title: body.title,
    amount: body.amount,
    created_at: new Date(),
    updated_at: new Date(),
    id: "",
  };
}

export const InvoicesService = {
  getAllInvoices,
  createInvoice,
};
