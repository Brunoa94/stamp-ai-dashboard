import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";

// Shared
import { env } from "./shared/config/env.js";
import { ErrorType } from "./shared/types/shared.js";
import prismaPlugin from "./shared/plugins/prismaPlugin.js";
import jwtPlugin from "./shared/plugins/jwt.js";
import swaggerPlugin from "./shared/plugins/swagger.js";
import redisPlugin from "./shared/plugins/redis.js";

// Modules
import healthRoutes from "./modules/health/health.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import invoiceRoutes from "./modules/invoice/invoice.routes.js";
import paymentProviderRoutes from "./modules/payment-provider/payment-provider.routes.js";
import stripeProviderRoutes from "./modules/stripe/stripe.routes.js";
import githubRoutes from "./modules/github/github.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import analyticsAgentRoutes from "./modules/analytics/analytics-agent.routes.js";
import databaseProviderRoutes from "./modules/supabase/supabse.router.js";

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
  app.register(redisPlugin);

  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(healthRoutes, { prefix: "/api/health" });
  app.register(invoiceRoutes, { prefix: "/api/invoices" });
  app.register(paymentProviderRoutes, { prefix: "/api/payment_providers" });
  app.register(stripeProviderRoutes, { prefix: "(/api/stripe" });
  app.register(adminRoutes, { prefix: "/api/admins" });
  app.register(githubRoutes, { prefix: "/api/github" });
  app.register(analyticsRoutes, { prefix: "/api/analytics" });
  app.register(analyticsAgentRoutes, { prefix: "/api/analytics-agent" });
  app.register(databaseProviderRoutes, { prefix: "/api/database" });

  app.setErrorHandler((err: ErrorType, _req, reply) => {
    app.log.error(err);
    const status = err.status ? err.status || 500 : 400;
    reply.code(status).send(err.error);
  });

  return app;
}
