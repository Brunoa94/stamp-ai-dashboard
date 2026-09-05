import { PaymentProvider } from "../../../generated/prisma/client.js";
import { PaymentProviderType } from "./payment-provider.types.js";

const createPaymentProviderMapper = (
  response: PaymentProvider,
): PaymentProviderType => ({
  id: response.id,
  name: response.name,
});

export const PaymentProviderMapper = { createPaymentProviderMapper };
