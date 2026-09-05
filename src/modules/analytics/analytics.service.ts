import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type {
  AnalyticsEventNameT,
  GA4DateRange,
  ParsedPageViewEvent,
  ParsedStepChangeEvent,
  ParsedColorSelectEvent,
  ParsedSizeSelectEvent,
  ParsedPurchaseEvent,
  ParsedImageUploadEvent,
  ParsedGenerateStartEvent,
  ParsedGenerateCompleteEvent,
  ParsedGenerateFailedEvent,
  ParsedCreateProductEvent,
  ParsedSelectItemEvent,
  ParsedAddToCartEvent,
} from "./analytics.types.js";
import {
  AnalyticsMapper,
  type ParsedGenericEvent,
} from "./analytics.mapper.js";

const analyticsDataClient = new BetaAnalyticsDataClient();
const propertyId = process.env.GA4_PROPERTY_ID || "";

function createEventFilter(eventName: AnalyticsEventNameT) {
  return {
    filter: {
      fieldName: "eventName",
      stringFilter: {
        value: eventName,
      },
    },
  };
}

function createDateRange(
  startDate: string = "7daysAgo",
  endDate: string = "today",
): GA4DateRange {
  return { startDate, endDate };
}

// Page View Events
async function getPageViewEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedPageViewEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "eventName" },
      { name: "pagePath" },
      { name: "pageTitle" },
    ],
    metrics: [{ name: "eventCount" }, { name: "eventValue" }],
    dimensionFilter: createEventFilter("page_view"),
  });

  return AnalyticsMapper.mapPageViewEvents(response.rows ?? []);
}

// Step Change Eventsw
async function getStepChangeEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedStepChangeEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:from_step" },
      { name: "customEvent:to_step" },
      { name: "customEvent:direction" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("step_change"),
  });

  return AnalyticsMapper.mapStepChangeEvents(response.rows ?? []);
}

// Color Select Events
async function getColorSelectEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedColorSelectEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:color" },
      { name: "customEvent:product_id" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("color_select"),
  });

  return AnalyticsMapper.mapColorSelectEvents(response.rows ?? []);
}

// Size Select Events
async function getSizeSelectEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedSizeSelectEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:size" },
      { name: "customEvent:product_id" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("size_select"),
  });

  return AnalyticsMapper.mapSizeSelectEvents(response.rows ?? []);
}

// Purchase Events
async function getPurchaseEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedPurchaseEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:transaction_id" },
      { name: "customEvent:payment_method" },
    ],
    metrics: [
      { name: "eventCount" },
      { name: "eventValue" },
      { name: "purchaseRevenue" },
    ],
    dimensionFilter: createEventFilter("purchase"),
  });

  return AnalyticsMapper.mapPurchaseEvents(response.rows ?? []);
}

// Generic event query
async function getEventsByName(
  eventName: AnalyticsEventNameT,
  startDate?: string,
  endDate?: string,
): Promise<ParsedGenericEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [{ name: "date" }, { name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "eventValue" }],
    dimensionFilter: createEventFilter(eventName),
  });

  return AnalyticsMapper.mapGenericEvents(response.rows ?? []);
}

// Image Upload Events
async function getImageUploadEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedImageUploadEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:file_type" },
      { name: "customEvent:file_size_kb" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("stamp_image_upload"),
  });

  return AnalyticsMapper.mapImageUploadEvents(response.rows ?? []);
}

// Generate Start Events
async function getGenerateStartEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedGenerateStartEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:prompt_length" },
      { name: "customEvent:preservation" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("stamp_generate_start"),
  });

  return AnalyticsMapper.mapGenerateStartEvents(response.rows ?? []);
}

// Generate Complete Events
async function getGenerateCompleteEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedGenerateCompleteEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:prompt_length" },
      { name: "customEvent:used_reference_image" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("stamp_generate_complete"),
  });

  return AnalyticsMapper.mapGenerateCompleteEvents(response.rows ?? []);
}

// Generate Failed Events
async function getGenerateFailedEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedGenerateFailedEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [{ name: "date" }, { name: "customEvent:reason" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("stamp_generate_failed"),
  });

  return AnalyticsMapper.mapGenerateFailedEvents(response.rows ?? []);
}

// Create Product Events
async function getCreateProductEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedCreateProductEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [
      { name: "date" },
      { name: "customEvent:product_id" },
      { name: "customEvent:color" },
      { name: "customEvent:size" },
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: createEventFilter("stamp_create_product"),
  });

  return AnalyticsMapper.mapCreateProductEvents(response.rows ?? []);
}

// Select Item Events
async function getSelectItemEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedSelectItemEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "eventCount" }, { name: "eventValue" }],
    dimensionFilter: createEventFilter("select_item"),
  });

  return AnalyticsMapper.mapSelectItemEvents(response.rows ?? []);
}

// Add To Cart Events
async function getAddToCartEvents(
  startDate?: string,
  endDate?: string,
): Promise<ParsedAddToCartEvent[]> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [createDateRange(startDate, endDate)],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "eventCount" }, { name: "eventValue" }],
    dimensionFilter: createEventFilter("add_to_cart"),
  });

  return AnalyticsMapper.mapAddToCartEvents(response.rows ?? []);
}

export const AnalyticsService = {
  getPageViewEvents,
  getStepChangeEvents,
  getColorSelectEvents,
  getSizeSelectEvents,
  getPurchaseEvents,
  getEventsByName,
  getImageUploadEvents,
  getGenerateStartEvents,
  getGenerateCompleteEvents,
  getGenerateFailedEvents,
  getCreateProductEvents,
  getSelectItemEvents,
  getAddToCartEvents,
};
