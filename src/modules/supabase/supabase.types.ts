import { Tables } from "./database.types.js";
import type { GetFilteredOrdersQueryType } from "./supabase.schema.js";

export type OrderType = Tables<"orders">;

export type GetOrdersFiltersType = GetFilteredOrdersQueryType;
