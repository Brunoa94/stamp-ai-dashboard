import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { GithubController } from "../controllers/github.controller.js";
import { githubWebhookSchema } from "../schemas/github.schema.js";

async function githubRoute(fastify: FastifyInstance) {
  // Keep the raw request body for HMAC verification before JSON parsing.
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    (request, body, done) => {
      if (!Buffer.isBuffer(body)) {
        done(new Error("Invalid payload"));
        return;
      }

      request.rawBody = body;

      try {
        const parsed = JSON.parse(body.toString("utf8"));
        done(null, parsed);
      } catch {
        done(new Error("Malformed JSON payload"));
      }
    },
  );

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      "/webhooks",
      { schema: githubWebhookSchema },
      GithubController.webhookEvent,
    );
}

export default githubRoute;
