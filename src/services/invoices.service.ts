import { CreateInvoiceType, InvoiceType } from "../types/invoices.js";
import { ErrorType } from "../types/shared.js";

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
  const error: ErrorType = {
    status: 500,
    error: {
      id: "SOMETHING_WENT_WRONG",
      message: "Testi",
    },
  };
  throw error;

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
