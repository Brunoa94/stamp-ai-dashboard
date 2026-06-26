import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import healthRoutes from "./routes/health.js";
import invoiceRoutes from "./routes/invoices.js";
import { env } from "./config/env.js";
import { ErrorType } from "./types/shared.js";
import prismaPlugin from "./plugins/prismaPlugin.js";

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

  app.register(healthRoutes, { prefix: "/api/health" });
  app.register(invoiceRoutes, { prefix: "/api/invoice" });

  return app;
}
