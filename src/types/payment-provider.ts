import { Static } from "@fastify/type-provider-typebox";
import {
  CreatePaymentProviderSchema,
  PaymentProviderSchema,
} from "../schemas/payment-provider.schema.js";

export type PaymentProviderType = Static<typeof PaymentProviderSchema>;
export type CreatePaymentProviderType = Static<
  typeof CreatePaymentProviderSchema
>;
