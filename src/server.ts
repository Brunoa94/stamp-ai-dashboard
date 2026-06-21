import fastify from "fastify";
import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function start() {
  const app = buildApp();

  ["SIGINT", "SIGTERM"].forEach((signal: string) => {
    process.on(signal, async () => {
      await app.close();

      process.exit(0);
    });
  });

  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
