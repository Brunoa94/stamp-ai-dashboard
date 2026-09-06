import { ErrorMapper } from "../../shared/mappers/error.mapper.js";
import { SupabaseClient } from "./supabase-client.js";
import { OrderType } from "./supabase.types.js";

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

export const SupabaseService = { getAllOrders };
