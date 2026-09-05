import { Type } from "@fastify/type-provider-typebox";

export const PaymentProviderSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export const getPaymentProviderSchema = {
  response: {
    200: Type.Array(PaymentProviderSchema),
  },
};

export const CreatePaymentProviderSchema = Type.Omit(
  PaymentProviderSchema,
  ["id"],
  { additionalProperties: false },
);

export const createPaymentProviderSchema = {
  body: CreatePaymentProviderSchema,
  response: {
    200: PaymentProviderSchema,
  },
};
