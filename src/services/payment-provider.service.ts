import { Prisma } from "../../generated/prisma/client.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { PaymentProviderMapper } from "../mappers/payment-provider.mapper.js";
import { prisma } from "../lib/prisma.js";
import { PaymentProviderType } from "../types/payment-provider.js";

type PaymentProviderCreateResponseType = {
  id: number;
};

async function createPaymentProvider({
  body,
}: {
  body: Prisma.PaymentProviderCreateInput;
}): Promise<PaymentProviderType> {
  try {
    const response = await prisma.paymentProvider.create({
      data: body,
      select: {
        id: true,
        name: true,
      },
    });

    return PaymentProviderMapper.createPaymentProviderMapper(response);
  } catch {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_PAYMENT_PROVIDER",
      description: "Failed to create payment provider",
    });
  }
}

export const PaymentProviderService = {
  createPaymentProvider,
};
