import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import healthRoutes from "./routes/health.js";
import invoiceRoutes from "./routes/invoices.js";
import { env } from "./config/env.js";
import { ErrorType } from "./types/shared.js";
import prismaPlugin from "./plugins/prismaPlugin.js";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import paymentProviderRoutes from "./routes/payment-provider.js";
import stripeProviderRoutes from "./routes/stripe.js";

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  app.setValidatorCompiler(TypeBoxValidatorCompiler);

  app.register(fastifyPostgres.default, {
    connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_SERVICE}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  });

  app.register(prismaPlugin);

  app.setErrorHandler((err: ErrorType, _req, reply) => {
    app.log.error(err);
    const status = err.status ? err.status || 500 : 400;
    reply.code(status).send(err.error);
  });

  app.register(swagger, {
    openapi: {
      info: {
        title: "Stamp AI Dashboard API",
        description: "API documentation",
        version: "1.0.0",
      },
    },
  });

  app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  app.register(healthRoutes, { prefix: "/api/health" });
  app.register(invoiceRoutes, { prefix: "/api/invoice" });
  app.register(paymentProviderRoutes, { prefix: "/api/payment_provider" });
  app.register(stripeProviderRoutes, { prefix: "/stripe" });

  return app;
}
