import { Type } from "@fastify/type-provider-typebox";
import type { Static } from "@fastify/type-provider-typebox";

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

export const InvoiceSchema = Type.Object({
  id: Type.String(),
  invoice_number: Type.String(),
  issued_at: Type.String(),
  order_id: Type.String(),
  order_number: Type.String(),
  customer_email: Type.String(),
  customer_name: Type.Union([Type.String(), Type.Null()]),
  status: Type.String(),
  type: Type.String(),
  currency: Type.String(),
  subtotal: Type.Number(),
  shipping_cost: Type.Number(),
  tax_amount: Type.Number(),
  discount_amount: Type.Number(),
  total_amount: Type.Number(),
  payment_method: Type.Union([Type.String(), Type.Null()]),
  payment_provider: Type.Union([Type.String(), Type.Null()]),
  pdf_bucket: Type.Union([Type.String(), Type.Null()]),
  pdf_path: Type.Union([Type.String(), Type.Null()]),
  related_invoice_id: Type.Union([Type.String(), Type.Null()]),
  user_id: Type.Union([Type.String(), Type.Null()]),
  emailed_at: Type.Union([Type.String(), Type.Null()]),
  created_at: Type.Union([Type.String(), Type.Null()]),
  updated_at: Type.Union([Type.String(), Type.Null()]),
  line_items: Type.Any(),
  shipping_address: Type.Union([Type.Any(), Type.Null()]),
  billing_address: Type.Union([Type.Any(), Type.Null()]),
});

export const InvoicesArraySchema = Type.Array(InvoiceSchema);

export const GetFilteredOrdersQuerySchema = Type.Object({
  status: Type.Optional(Type.String()),
  payment_status: Type.Optional(Type.String()),
  payment_provider: Type.Optional(Type.String()),
  payment_method: Type.Optional(Type.String()),
  customer_email: Type.Optional(Type.String()),
  customer_name: Type.Optional(Type.String()),
  order_number: Type.Optional(Type.String()),
  user_id: Type.Optional(Type.String()),
  product_id: Type.Optional(Type.String()),
  created_from: Type.Optional(Type.String({ format: "date-time" })),
  created_to: Type.Optional(Type.String({ format: "date-time" })),
  min_total_amount: Type.Optional(Type.Number()),
  max_total_amount: Type.Optional(Type.Number()),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 500 })),
  offset: Type.Optional(Type.Integer({ minimum: 0 })),
  sort_by: Type.Optional(
    Type.Union([
      Type.Literal("created_at"),
      Type.Literal("updated_at"),
      Type.Literal("total_amount"),
      Type.Literal("order_number"),
    ]),
  ),
  sort_order: Type.Optional(
    Type.Union([Type.Literal("asc"), Type.Literal("desc")]),
  ),
});

export type GetFilteredOrdersQueryType = Static<
  typeof GetFilteredOrdersQuerySchema
>;

export const GetFilteredInvoicesQuerySchema = Type.Object({
  status: Type.Optional(Type.String()),
  type: Type.Optional(Type.String()),
  payment_provider: Type.Optional(Type.String()),
  payment_method: Type.Optional(Type.String()),
  customer_email: Type.Optional(Type.String()),
  customer_name: Type.Optional(Type.String()),
  invoice_number: Type.Optional(Type.String()),
  order_number: Type.Optional(Type.String()),
  order_id: Type.Optional(Type.String()),
  user_id: Type.Optional(Type.String()),
  issued_from: Type.Optional(Type.String({ format: "date-time" })),
  issued_to: Type.Optional(Type.String({ format: "date-time" })),
  created_from: Type.Optional(Type.String({ format: "date-time" })),
  created_to: Type.Optional(Type.String({ format: "date-time" })),
  min_total_amount: Type.Optional(Type.Number()),
  max_total_amount: Type.Optional(Type.Number()),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 500 })),
  offset: Type.Optional(Type.Integer({ minimum: 0 })),
  sort_by: Type.Optional(
    Type.Union([
      Type.Literal("created_at"),
      Type.Literal("updated_at"),
      Type.Literal("issued_at"),
      Type.Literal("total_amount"),
      Type.Literal("invoice_number"),
    ]),
  ),
  sort_order: Type.Optional(
    Type.Union([Type.Literal("asc"), Type.Literal("desc")]),
  ),
});

export type GetFilteredInvoicesQueryType = Static<
  typeof GetFilteredInvoicesQuerySchema
>;

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

export const getOrdersByFiltersSchema = {
  tags: ["Orders"],
  summary: "Get Orders By Filters",
  description: "Returns orders filtered by optional query params",
  operationId: "getOrdersByFilters",
  security: [{ bearerAuth: [] }],
  querystring: GetFilteredOrdersQuerySchema,
  response: {
    200: OrdersArraySchema,
  },
};

export const getAllInvoicesSchema = {
  tags: ["Invoices"],
  summary: "Get All Invoices",
  description: "Returns all invoices in the database",
  operationId: "getAllInvoices",
  security: [{ bearerAuth: [] }],
  response: {
    200: InvoicesArraySchema,
  },
};

export const getInvoicesByFiltersSchema = {
  tags: ["Invoices"],
  summary: "Get Invoices By Filters",
  description: "Returns invoices filtered by optional query params",
  operationId: "getInvoicesByFilters",
  security: [{ bearerAuth: [] }],
  querystring: GetFilteredInvoicesQuerySchema,
  response: {
    200: InvoicesArraySchema,
  },
};
