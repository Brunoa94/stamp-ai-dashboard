import { PaymentProvider } from "../../generated/prisma/client.js";
import { PaymentProviderType } from "../types/payment-provider.js";

const createPaymentProviderMapper = (
  response: PaymentProvider,
): PaymentProviderType => ({
  id: response.id,
  name: response.name,
});

export const PaymentProviderMapper = { createPaymentProviderMapper };
