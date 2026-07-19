import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import healthRoutes from "./routes/health.js";
import invoiceRoutes from "./routes/invoice.js";
import { env } from "./config/env.js";
import { ErrorType } from "./types/shared.js";
import prismaPlugin from "./plugins/prismaPlugin.js";
import paymentProviderRoutes from "./routes/payment-provider.js";
import stripeProviderRoutes from "./routes/stripe.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import jwtPlugin from "./plugins/jwt.js";
import swaggerPlugin from "./plugins/swagger.js";

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
  app.register(jwtPlugin);
  app.register(swaggerPlugin);

  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(healthRoutes, { prefix: "/api/health" });
  app.register(invoiceRoutes, { prefix: "/api/invoices" });
  app.register(paymentProviderRoutes, { prefix: "/api/payment_providers" });
  app.register(stripeProviderRoutes, { prefix: "/stripe" });
  app.register(adminRoutes, { prefix: "/admins" });

  app.setErrorHandler((err: ErrorType, _req, reply) => {
    app.log.error(err);
    const status = err.status ? err.status || 500 : 400;
    reply.code(status).send(err.error);
  });

  return app;
}
