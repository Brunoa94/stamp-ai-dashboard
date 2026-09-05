import { Type } from "@fastify/type-provider-typebox";

// Event name enum
export const AnalyticsEventNameSchema = Type.Union([
  // Auth
  Type.Literal("sign_up"),
  Type.Literal("login"),
  Type.Literal("logout"),
  // GA4 enhanced e-commerce
  Type.Literal("select_item"),
  Type.Literal("add_to_cart"),
  Type.Literal("remove_from_cart"),
  Type.Literal("view_cart"),
  Type.Literal("begin_checkout"),
  Type.Literal("add_payment_info"),
  Type.Literal("purchase"),
  // Stamp flow
  Type.Literal("stamp_image_upload"),
  Type.Literal("stamp_generate_start"),
  Type.Literal("stamp_generate_complete"),
  Type.Literal("stamp_generate_failed"),
  Type.Literal("stamp_create_product"),
  // Customization
  Type.Literal("color_select"),
  Type.Literal("size_select"),
  // Navigation
  Type.Literal("page_view"),
  Type.Literal("step_change"),
]);

// Query parameters for date range
const DateRangeQuerySchema = Type.Object({
  startDate: Type.Optional(
    Type.String({ description: "Start date (e.g., '7daysAgo', '2024-01-01')" }),
  ),
  endDate: Type.Optional(
    Type.String({ description: "End date (e.g., 'today', '2024-01-31')" }),
  ),
});

// Response schemas
const PageViewEventSchema = Type.Object({
  date: Type.String(),
  eventName: Type.String(),
  pagePath: Type.String(),
  pageTitle: Type.String(),
  customPagePath: Type.String(),
  eventCount: Type.Number(),
  eventValue: Type.Number(),
});

const StepChangeEventSchema = Type.Object({
  date: Type.String(),
  fromStep: Type.Number(),
  toStep: Type.Number(),
  direction: Type.String(),
  eventCount: Type.Number(),
});

const ColorSelectEventSchema = Type.Object({
  date: Type.String(),
  color: Type.String(),
  productId: Type.String(),
  eventCount: Type.Number(),
});

const SizeSelectEventSchema = Type.Object({
  date: Type.String(),
  size: Type.String(),
  productId: Type.String(),
  eventCount: Type.Number(),
});

const PurchaseEventSchema = Type.Object({
  date: Type.String(),
  transactionId: Type.String(),
  paymentMethod: Type.String(),
  eventCount: Type.Number(),
  eventValue: Type.Number(),
  purchaseRevenue: Type.Number(),
});

const GenericEventSchema = Type.Object({
  date: Type.String(),
  eventName: Type.String(),
  eventCount: Type.Number(),
  eventValue: Type.Number(),
});

const ImageUploadEventSchema = Type.Object({
  date: Type.String(),
  fileType: Type.String(),
  fileSizeKb: Type.Number(),
  eventCount: Type.Number(),
});

const GenerateStartEventSchema = Type.Object({
  date: Type.String(),
  promptLength: Type.Number(),
  preservation: Type.Number(),
  eventCount: Type.Number(),
});

const GenerateCompleteEventSchema = Type.Object({
  date: Type.String(),
  promptLength: Type.Number(),
  usedReferenceImage: Type.Boolean(),
  eventCount: Type.Number(),
});

const GenerateFailedEventSchema = Type.Object({
  date: Type.String(),
  reason: Type.String(),
  eventCount: Type.Number(),
});

const CreateProductEventSchema = Type.Object({
  date: Type.String(),
  productId: Type.String(),
  color: Type.String(),
  size: Type.String(),
  eventCount: Type.Number(),
});

const SelectItemEventSchema = Type.Object({
  date: Type.String(),
  itemId: Type.String(),
  itemName: Type.String(),
  price: Type.Number(),
  eventCount: Type.Number(),
});

const AddToCartEventSchema = Type.Object({
  date: Type.String(),
  itemId: Type.String(),
  itemName: Type.String(),
  value: Type.Number(),
  eventCount: Type.Number(),
});

const ErrorSchema = Type.Object({
  error: Type.String(),
});

// Route schemas
export const getPageViewEventsSchema = {
  tags: ["Analytics"],
  summary: "Get page view events",
  description: "Retrieves page view events from Google Analytics",
  operationId: "getPageViewEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(PageViewEventSchema),
    500: ErrorSchema,
  },
};

export const getStepChangeEventsSchema = {
  tags: ["Analytics"],
  summary: "Get step change events",
  description: "Retrieves step change events from the stamp flow",
  operationId: "getStepChangeEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(StepChangeEventSchema),
    500: ErrorSchema,
  },
};

export const getColorSelectEventsSchema = {
  tags: ["Analytics"],
  summary: "Get color select events",
  description: "Retrieves color selection events",
  operationId: "getColorSelectEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(ColorSelectEventSchema),
    500: ErrorSchema,
  },
};

export const getSizeSelectEventsSchema = {
  tags: ["Analytics"],
  summary: "Get size select events",
  description: "Retrieves size selection events",
  operationId: "getSizeSelectEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(SizeSelectEventSchema),
    500: ErrorSchema,
  },
};

export const getPurchaseEventsSchema = {
  tags: ["Analytics"],
  summary: "Get purchase events",
  description: "Retrieves purchase events with revenue data",
  operationId: "getPurchaseEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(PurchaseEventSchema),
    500: ErrorSchema,
  },
};

export const getEventsByNameSchema = {
  tags: ["Analytics"],
  summary: "Get events by name",
  description: "Retrieves events filtered by event name",
  operationId: "getEventsByName",
  params: Type.Object({
    eventName: AnalyticsEventNameSchema,
  }),
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(GenericEventSchema),
    500: ErrorSchema,
  },
};

export const getImageUploadEventsSchema = {
  tags: ["Analytics"],
  summary: "Get image upload events",
  description: "Retrieves stamp image upload events",
  operationId: "getImageUploadEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(ImageUploadEventSchema),
    500: ErrorSchema,
  },
};

export const getGenerateStartEventsSchema = {
  tags: ["Analytics"],
  summary: "Get generate start events",
  description: "Retrieves stamp generate start events",
  operationId: "getGenerateStartEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(GenerateStartEventSchema),
    500: ErrorSchema,
  },
};

export const getGenerateCompleteEventsSchema = {
  tags: ["Analytics"],
  summary: "Get generate complete events",
  description: "Retrieves stamp generate complete events",
  operationId: "getGenerateCompleteEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(GenerateCompleteEventSchema),
    500: ErrorSchema,
  },
};

export const getGenerateFailedEventsSchema = {
  tags: ["Analytics"],
  summary: "Get generate failed events",
  description: "Retrieves stamp generate failed events",
  operationId: "getGenerateFailedEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(GenerateFailedEventSchema),
    500: ErrorSchema,
  },
};

export const getCreateProductEventsSchema = {
  tags: ["Analytics"],
  summary: "Get create product events",
  description: "Retrieves stamp create product events",
  operationId: "getCreateProductEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(CreateProductEventSchema),
    500: ErrorSchema,
  },
};

export const getSelectItemEventsSchema = {
  tags: ["Analytics"],
  summary: "Get select item events",
  description: "Retrieves product selection events",
  operationId: "getSelectItemEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(SelectItemEventSchema),
    500: ErrorSchema,
  },
};

export const getAddToCartEventsSchema = {
  tags: ["Analytics"],
  summary: "Get add to cart events",
  description: "Retrieves add to cart events",
  operationId: "getAddToCartEvents",
  querystring: DateRangeQuerySchema,
  response: {
    200: Type.Array(AddToCartEventSchema),
    500: ErrorSchema,
  },
};

// Export types
export type DateRangeQuery = {
  startDate?: string;
  endDate?: string;
};

export type EventNameParams = {
  eventName: string;
};
