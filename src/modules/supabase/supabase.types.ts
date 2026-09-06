import { Tables } from "./database.types.js";
import type {
  GetFilteredInvoicesQueryType,
  GetFilteredOrdersQueryType,
} from "./supabase.schema.js";

export type OrderType = Tables<"orders">;
export type InvoiceType = Tables<"invoices">;

export type GetOrdersFiltersType = GetFilteredOrdersQueryType;
export type GetInvoicesFiltersType = GetFilteredInvoicesQueryType;
