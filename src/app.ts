import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import healthRoutes from "./routes/health.js";
import invoiceRoutes from "./routes/invoices.js";
import { env } from "./config/env.js";

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyPostgres.default, {
    connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_SERVICE}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  });

  app.register(healthRoutes, { prefix: "/api/health" });
  app.register(invoiceRoutes, { prefix: "/api/invoice" });

  return app;
}
