import { Type } from "@fastify/type-provider-typebox";

// TypeBox schema matching the Supabase orders table
export const OrderSchema = Type.Object({
  id: Type.String(),
  order_number: Type.String(),
  customer_email: Type.String(),
  customer_name: Type.Union([Type.String(), Type.Null()]),
  customer_phone: Type.Union([Type.String(), Type.Null()]),
  status: Type.Union([Type.String(), Type.Null()]),
  payment_status: Type.Union([Type.String(), Type.Null()]),
  payment_method: Type.Union([Type.String(), Type.Null()]),
  payment_provider: Type.Union([Type.String(), Type.Null()]),
  subtotal: Type.Union([Type.Number(), Type.Null()]),
  shipping_cost: Type.Union([Type.Number(), Type.Null()]),
  tax_amount: Type.Union([Type.Number(), Type.Null()]),
  discount_amount: Type.Union([Type.Number(), Type.Null()]),
  total_amount: Type.Union([Type.Number(), Type.Null()]),
  currency: Type.Union([Type.String(), Type.Null()]),
  shipping_address: Type.Union([Type.Any(), Type.Null()]),
  billing_address: Type.Union([Type.Any(), Type.Null()]),
  tracking_number: Type.Union([Type.String(), Type.Null()]),
  tracking_url: Type.Union([Type.String(), Type.Null()]),
  printify_order_id: Type.Union([Type.String(), Type.Null()]),
  printify_status: Type.Union([Type.String(), Type.Null()]),
  printify_synced_at: Type.Union([Type.String(), Type.Null()]),
  promo_code: Type.Union([Type.String(), Type.Null()]),
  promo_value: Type.Union([Type.Number(), Type.Null()]),
  user_id: Type.Union([Type.String(), Type.Null()]),
  product_id: Type.Union([Type.String(), Type.Null()]),
  idempotency_key: Type.Union([Type.String(), Type.Null()]),
  cancellation_reason: Type.Union([Type.String(), Type.Null()]),
  shipped_at: Type.Union([Type.String(), Type.Null()]),
  delivered_at: Type.Union([Type.String(), Type.Null()]),
  cancelled_at: Type.Union([Type.String(), Type.Null()]),
  created_at: Type.Union([Type.String(), Type.Null()]),
  updated_at: Type.Union([Type.String(), Type.Null()]),
});

// Array schema for multiple orders
export const OrdersArraySchema = Type.Array(OrderSchema);

export const getAllOrdersSchema = {
  tags: ["Orders"],
  summary: "Get All Orders",
  description: "Returns all orders in the database",
  operationId: "getAllOrders",
  security: [{ bearerAuth: [] }],
  response: {
    200: OrdersArraySchema,
  },
};
