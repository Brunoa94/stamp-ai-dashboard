import { SupabaseClient } from "./supabase-client.js";
import { GetOrdersFiltersType } from "./supabase.types.js";

export function appendOrdersFilters(filters: GetOrdersFiltersType) {
  let query = SupabaseClient.from("orders").select("*");

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.payment_status) {
    query = query.eq("payment_status", filters.payment_status);
  }

  if (filters.payment_provider) {
    query = query.eq("payment_provider", filters.payment_provider);
  }

  if (filters.payment_method) {
    query = query.eq("payment_method", filters.payment_method);
  }

  if (filters.customer_email) {
    query = query.ilike("customer_email", `%${filters.customer_email}%`);
  }

  if (filters.customer_name) {
    query = query.ilike("customer_name", `%${filters.customer_name}%`);
  }

  if (filters.order_number) {
    query = query.ilike("order_number", `%${filters.order_number}%`);
  }

  if (filters.user_id) {
    query = query.eq("user_id", filters.user_id);
  }

  if (filters.product_id) {
    query = query.eq("product_id", filters.product_id);
  }

  if (filters.created_from) {
    query = query.gte("created_at", filters.created_from);
  }

  if (filters.created_to) {
    query = query.lte("created_at", filters.created_to);
  }

  if (filters.min_total_amount !== undefined) {
    query = query.gte("total_amount", filters.min_total_amount);
  }

  if (filters.max_total_amount !== undefined) {
    query = query.lte("total_amount", filters.max_total_amount);
  }

  const sortBy = filters.sort_by ?? "created_at";
  const sortAscending = filters.sort_order === "asc";

  query = query.order(sortBy, {
    ascending: sortAscending,
    nullsFirst: false,
  });

  if (filters.limit !== undefined || filters.offset !== undefined) {
    const limit = filters.limit ?? 50;
    const offset = filters.offset ?? 0;

    query = query.range(offset, offset + limit - 1);
  }

  return query;
}
