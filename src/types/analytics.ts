export type AnalyticsEventNameT =
  // Auth
  | "sign_up"
  | "login"
  | "logout"
  // GA4 enhanced e-commerce
  | "select_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_payment_info"
  | "purchase"
  // Stamp flow
  | "stamp_image_upload"
  | "stamp_generate_start"
  | "stamp_generate_complete"
  | "stamp_generate_failed"
  | "stamp_create_product"
  // Customization
  | "color_select"
  | "size_select"
  // Navigation
  | "page_view"
  | "step_change";

export type AnalyticsItemT = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_variant?: string;
};

export type AnalyticsEventParamsT = {
  [key: string]: string | number | boolean | AnalyticsItemT[] | undefined;
};

// GA4 Data API request types
export type GA4DateRange = {
  startDate: string;
  endDate: string;
};

export type GA4Dimension = {
  name: string;
};

export type GA4Metric = {
  name: string;
};

export type GA4StringFilter = {
  value: string;
  matchType?: "EXACT" | "BEGINS_WITH" | "ENDS_WITH" | "CONTAINS" | "REGEXP";
};

export type GA4Filter = {
  fieldName: string;
  stringFilter?: GA4StringFilter;
};

export type GA4DimensionFilter = {
  filter?: GA4Filter;
  andGroup?: { expressions: GA4DimensionFilter[] };
  orGroup?: { expressions: GA4DimensionFilter[] };
};

export type GA4ReportRequest = {
  property: string;
  dateRanges: GA4DateRange[];
  dimensions: GA4Dimension[];
  metrics: GA4Metric[];
  dimensionFilter?: GA4DimensionFilter;
};

// Event-specific request configurations
export type PageViewEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "pagePath" },
    { name: "pageTitle" },
    { name: "customEvent:page_path" },
  ];
};

export type StepChangeEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "customEvent:from_step" },
    { name: "customEvent:to_step" },
    { name: "customEvent:direction" },
  ];
};

export type ColorSelectEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "customEvent:color" },
    { name: "customEvent:product_id" },
  ];
};

export type SizeSelectEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "customEvent:size" },
    { name: "customEvent:product_id" },
  ];
};

export type PurchaseEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "customEvent:transaction_id" },
    { name: "customEvent:payment_method" },
  ];
  metrics: [
    { name: "eventCount" },
    { name: "eventValue" },
    { name: "purchaseRevenue" },
  ];
};

export type EcommerceEventRequest = GA4ReportRequest & {
  dimensions: [
    { name: "date" },
    { name: "eventName" },
    { name: "customEvent:currency" },
    { name: "customEvent:value" },
  ];
};

// Response types
export type GA4DimensionValue = {
  value: string;
};

export type GA4MetricValue = {
  value: string;
};

export type GA4Row = {
  dimensionValues?: GA4DimensionValue[];
  metricValues?: GA4MetricValue[];
};

export type GA4ReportResponse = {
  rows?: GA4Row[];
  rowCount?: number;
};

// Parsed event data types
export type ParsedPageViewEvent = {
  date: string;
  eventName: string;
  pagePath: string;
  pageTitle: string;
  customPagePath: string;
  eventCount: number;
  eventValue: number;
};

export type ParsedStepChangeEvent = {
  date: string;
  fromStep: number;
  toStep: number;
  direction: string;
  eventCount: number;
};

export type ParsedColorSelectEvent = {
  date: string;
  color: string;
  productId: string;
  eventCount: number;
};

export type ParsedSizeSelectEvent = {
  date: string;
  size: string;
  productId: string;
  eventCount: number;
};

export type ParsedPurchaseEvent = {
  date: string;
  transactionId: string;
  paymentMethod: string;
  eventCount: number;
  eventValue: number;
  purchaseRevenue: number;
};

// Stamp Flow Events
export type ParsedImageUploadEvent = {
  date: string;
  fileType: string;
  fileSizeKb: number;
  eventCount: number;
};

export type ParsedGenerateStartEvent = {
  date: string;
  promptLength: number;
  preservation: number;
  eventCount: number;
};

export type ParsedGenerateCompleteEvent = {
  date: string;
  promptLength: number;
  usedReferenceImage: boolean;
  eventCount: number;
};

export type ParsedGenerateFailedEvent = {
  date: string;
  reason: string;
  eventCount: number;
};

export type ParsedCreateProductEvent = {
  date: string;
  productId: string;
  color: string;
  size: string;
  eventCount: number;
};

export type ParsedSelectItemEvent = {
  date: string;
  itemId: string;
  itemName: string;
  price: number;
  eventCount: number;
};

export type ParsedAddToCartEvent = {
  date: string;
  itemId: string;
  itemName: string;
  value: number;
  eventCount: number;
};
