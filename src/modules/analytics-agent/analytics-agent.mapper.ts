import { AnalyticsService } from "../analytics/analytics.service.js";

import {
  ParsedAddToCartEvent,
  ParsedColorSelectEvent,
  ParsedCreateProductEvent,
  ParsedGenerateCompleteEvent,
  ParsedGenerateFailedEvent,
  ParsedGenerateStartEvent,
  ParsedImageUploadEvent,
  ParsedPageViewEvent,
  ParsedPurchaseEvent,
  ParsedSelectItemEvent,
  ParsedSizeSelectEvent,
  ParsedStepChangeEvent,
} from "../analytics/analytics.types.js";
import { ParsedGenericEvent } from "../analytics/analytics.mapper.js";
import { GAEventType } from "./analytics-agents.types.js";

type ReturnAnalyticsServiceType =
  | ParsedPageViewEvent
  | ParsedStepChangeEvent
  | ParsedColorSelectEvent
  | ParsedSizeSelectEvent
  | ParsedPurchaseEvent
  | ParsedGenericEvent
  | ParsedImageUploadEvent
  | ParsedGenerateStartEvent
  | ParsedGenerateCompleteEvent
  | ParsedGenerateFailedEvent
  | ParsedCreateProductEvent
  | ParsedSelectItemEvent
  | ParsedAddToCartEvent;

type ReturnAnalyticsType = (
  start_date: string,
  end_date: string,
) => Promise<ReturnAnalyticsServiceType[]>;

const fromGAEventToService: Record<GAEventType, ReturnAnalyticsType> = {
  add_to_cart: AnalyticsService.getAddToCartEvents,
  begin_checkout: (s, e) =>
    AnalyticsService.getEventsByName("begin_checkout", s, e),
  color_select: AnalyticsService.getColorSelectEvents,
  first_visit: (s, e) => AnalyticsService.getEventsByName("first_visit", s, e),
  form_start: (s, e) => AnalyticsService.getEventsByName("form_start", s, e),
  login: (s, e) => AnalyticsService.getEventsByName("login", s, e),
  logout: (s, e) => AnalyticsService.getEventsByName("logout", s, e),
  page_view: AnalyticsService.getPageViewEvents,
  purchase: AnalyticsService.getPurchaseEvents,
  remove_from_cart: (s, e) =>
    AnalyticsService.getEventsByName("remove_from_cart", s, e),
  scroll: (s, e) => AnalyticsService.getEventsByName("scroll", s, e),
  select_item: AnalyticsService.getSelectItemEvents,
  session_start: (s, e) => AnalyticsService.getEventsByName("login", s, e),
  size_select: AnalyticsService.getSizeSelectEvents,
  stamp_create_product: AnalyticsService.getCreateProductEvents,
  stamp_generate_complete: AnalyticsService.getGenerateCompleteEvents,
  stamp_generate_failed: AnalyticsService.getGenerateFailedEvents,
  stamp_generate_start: AnalyticsService.getGenerateStartEvents,
  stamp_image_upload: AnalyticsService.getImageUploadEvents,
  step_change: AnalyticsService.getStepChangeEvents,
  user_engagement: (s, e) =>
    AnalyticsService.getEventsByName("user_engagement", s, e),
  view_cart: (s, e) => AnalyticsService.getEventsByName("view_cart", s, e),
};

export const AnalyticsAgentMapper = { fromGAEventToService };
