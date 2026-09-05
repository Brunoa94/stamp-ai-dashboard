import type { google } from "@google-analytics/data/build/protos/protos.js";
import type {
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

type IRow = google.analytics.data.v1beta.IRow;

function getDimensionValue(row: IRow, index: number): string {
  return row.dimensionValues?.[index]?.value ?? "";
}

function getDimensionValueInt(row: IRow, index: number): number {
  const value = row.dimensionValues?.[index]?.value;
  if (!value || value === "(not set)") return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function getDimensionValueFloat(row: IRow, index: number): number {
  const value = row.dimensionValues?.[index]?.value;
  if (!value || value === "(not set)") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function getMetricValueInt(row: IRow, index: number): number {
  const value = row.metricValues?.[index]?.value;
  if (!value) return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function getMetricValueFloat(row: IRow, index: number): number {
  const value = row.metricValues?.[index]?.value;
  if (!value) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

// Page View Event Mapper
function mapPageViewEvent(row: IRow): ParsedPageViewEvent {
  return {
    date: getDimensionValue(row, 0),
    eventName: getDimensionValue(row, 1),
    pagePath: getDimensionValue(row, 2),
    pageTitle: getDimensionValue(row, 3),
    customPagePath: getDimensionValue(row, 4),
    eventCount: getMetricValueInt(row, 0),
    eventValue: getMetricValueFloat(row, 1),
  };
}

function mapPageViewEvents(rows: IRow[]): ParsedPageViewEvent[] {
  return rows.map(mapPageViewEvent);
}

// Step Change Event Mapper
function mapStepChangeEvent(row: IRow): ParsedStepChangeEvent {
  return {
    date: getDimensionValue(row, 0),
    fromStep: getDimensionValueInt(row, 1),
    toStep: getDimensionValueInt(row, 2),
    direction: getDimensionValue(row, 3),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapStepChangeEvents(rows: IRow[]): ParsedStepChangeEvent[] {
  return rows.map(mapStepChangeEvent);
}

// Color Select Event Mapper
function mapColorSelectEvent(row: IRow): ParsedColorSelectEvent {
  return {
    date: getDimensionValue(row, 0),
    color: getDimensionValue(row, 1),
    productId: getDimensionValue(row, 2),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapColorSelectEvents(rows: IRow[]): ParsedColorSelectEvent[] {
  return rows.map(mapColorSelectEvent);
}

// Size Select Event Mapper
function mapSizeSelectEvent(row: IRow): ParsedSizeSelectEvent {
  return {
    date: getDimensionValue(row, 0),
    size: getDimensionValue(row, 1),
    productId: getDimensionValue(row, 2),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapSizeSelectEvents(rows: IRow[]): ParsedSizeSelectEvent[] {
  return rows.map(mapSizeSelectEvent);
}

// Purchase Event Mapper
function mapPurchaseEvent(row: IRow): ParsedPurchaseEvent {
  return {
    date: getDimensionValue(row, 0),
    transactionId: getDimensionValue(row, 1),
    paymentMethod: getDimensionValue(row, 2),
    eventCount: getMetricValueInt(row, 0),
    eventValue: getMetricValueFloat(row, 1),
    purchaseRevenue: getMetricValueFloat(row, 2),
  };
}

function mapPurchaseEvents(rows: IRow[]): ParsedPurchaseEvent[] {
  return rows.map(mapPurchaseEvent);
}

// Generic Event Mapper
type ParsedGenericEvent = {
  date: string;
  eventName: string;
  eventCount: number;
  eventValue: number;
};

function mapGenericEvent(row: IRow): ParsedGenericEvent {
  return {
    date: getDimensionValue(row, 0),
    eventName: getDimensionValue(row, 1),
    eventCount: getMetricValueInt(row, 0),
    eventValue: getMetricValueFloat(row, 1),
  };
}

function mapGenericEvents(rows: IRow[]): ParsedGenericEvent[] {
  return rows.map(mapGenericEvent);
}

// Image Upload Event Mapper
function mapImageUploadEvent(row: IRow): ParsedImageUploadEvent {
  return {
    date: getDimensionValue(row, 0),
    fileType: getDimensionValue(row, 1),
    fileSizeKb: getDimensionValueInt(row, 2),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapImageUploadEvents(rows: IRow[]): ParsedImageUploadEvent[] {
  return rows.map(mapImageUploadEvent);
}

// Generate Start Event Mapper
function mapGenerateStartEvent(row: IRow): ParsedGenerateStartEvent {
  return {
    date: getDimensionValue(row, 0),
    promptLength: getDimensionValueInt(row, 1),
    preservation: getDimensionValueInt(row, 2),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapGenerateStartEvents(rows: IRow[]): ParsedGenerateStartEvent[] {
  return rows.map(mapGenerateStartEvent);
}

// Generate Complete Event Mapper
function mapGenerateCompleteEvent(row: IRow): ParsedGenerateCompleteEvent {
  return {
    date: getDimensionValue(row, 0),
    promptLength: getDimensionValueInt(row, 1),
    usedReferenceImage: getDimensionValue(row, 2) === "true",
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapGenerateCompleteEvents(rows: IRow[]): ParsedGenerateCompleteEvent[] {
  return rows.map(mapGenerateCompleteEvent);
}

// Generate Failed Event Mapper
function mapGenerateFailedEvent(row: IRow): ParsedGenerateFailedEvent {
  return {
    date: getDimensionValue(row, 0),
    reason: getDimensionValue(row, 1),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapGenerateFailedEvents(rows: IRow[]): ParsedGenerateFailedEvent[] {
  return rows.map(mapGenerateFailedEvent);
}

// Create Product Event Mapper
function mapCreateProductEvent(row: IRow): ParsedCreateProductEvent {
  return {
    date: getDimensionValue(row, 0),
    productId: getDimensionValue(row, 1),
    color: getDimensionValue(row, 2),
    size: getDimensionValue(row, 3),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapCreateProductEvents(rows: IRow[]): ParsedCreateProductEvent[] {
  return rows.map(mapCreateProductEvent);
}

// Select Item Event Mapper
function mapSelectItemEvent(row: IRow): ParsedSelectItemEvent {
  return {
    date: getDimensionValue(row, 0),
    itemId: "",
    itemName: "",
    price: getMetricValueFloat(row, 1),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapSelectItemEvents(rows: IRow[]): ParsedSelectItemEvent[] {
  return rows.map(mapSelectItemEvent);
}

// Add To Cart Event Mapper
function mapAddToCartEvent(row: IRow): ParsedAddToCartEvent {
  return {
    date: getDimensionValue(row, 0),
    itemId: "",
    itemName: "",
    value: getMetricValueFloat(row, 1),
    eventCount: getMetricValueInt(row, 0),
  };
}

function mapAddToCartEvents(rows: IRow[]): ParsedAddToCartEvent[] {
  return rows.map(mapAddToCartEvent);
}

export const AnalyticsMapper = {
  // Single row mappers
  mapPageViewEvent,
  mapStepChangeEvent,
  mapColorSelectEvent,
  mapSizeSelectEvent,
  mapPurchaseEvent,
  mapGenericEvent,
  mapImageUploadEvent,
  mapGenerateStartEvent,
  mapGenerateCompleteEvent,
  mapGenerateFailedEvent,
  mapCreateProductEvent,
  mapSelectItemEvent,
  mapAddToCartEvent,
  // Batch mappers
  mapPageViewEvents,
  mapStepChangeEvents,
  mapColorSelectEvents,
  mapSizeSelectEvents,
  mapPurchaseEvents,
  mapGenericEvents,
  mapImageUploadEvents,
  mapGenerateStartEvents,
  mapGenerateCompleteEvents,
  mapGenerateFailedEvents,
  mapCreateProductEvents,
  mapSelectItemEvents,
  mapAddToCartEvents,
  // Utility functions
  getDimensionValue,
  getDimensionValueInt,
  getDimensionValueFloat,
  getMetricValueInt,
  getMetricValueFloat,
};

export type { ParsedGenericEvent };
