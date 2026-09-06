import { ErrorMapper } from "../../shared/mappers/error.mapper.js";
import { SupabaseClient } from "./supabase-client.js";
import { appendOrdersFilters } from "./supabase.helper.js";
import { GetOrdersFiltersType, OrderType } from "./supabase.types.js";

async function getAllOrders(): Promise<OrderType[]> {
  const { data, error } = await SupabaseClient.from("orders").select("*");

  if (error) {
    throw ErrorMapper.Create({
      status: 500,
      service: "SUPABASE_SERVICE",
      description: "Failed to get all orders",
      ...error,
    });
  }

  return data ?? [];
}

async function getOrdersByFilters(
  filters: GetOrdersFiltersType,
): Promise<OrderType[]> {
  const query = appendOrdersFilters(filters);

  const { data, error } = await query;

  if (error) {
    throw ErrorMapper.Create({
      status: 500,
      service: "SUPABASE_SERVICE",
      description: "Failed to get orders by filters",
      ...error,
    });
  }

  return data ?? [];
}

export const SupabaseService = {
  getAllOrders,
  getOrdersByFilters,
};
