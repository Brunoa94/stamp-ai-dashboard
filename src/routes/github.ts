import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { env } from "../config/env.js";

function verifyGithubSignature(
  rawBody: Buffer,
  signatureHeader?: string,
): boolean {
  if (!signatureHeader || !env.GITHUB_WEBHOOK_SECRET) return false;

  const [prefix, incomingDigest] = signatureHeader.split("=");
  if (prefix !== "sha256" || !incomingDigest) return false;

  const expectedDigest = crypto
    .createHmac("sha256", env.GITHUB_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  const incoming = Buffer.from(incomingDigest, "hex");
  const expected = Buffer.from(expectedDigest, "hex");

  if (incoming.length !== expected.length) return false;

  return crypto.timingSafeEqual(incoming, expected);
}

async function githubRoute(fastify: FastifyInstance) {
  // Keep the raw request body for HMAC verification before JSON parsing.
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    (request, body, done) => {
      done(null, body);
    },
  );

  fastify.post("/webhooks", async (request, reply) => {
    const rawBody = request.body;
    if (!Buffer.isBuffer(rawBody)) {
      return reply.code(400).send({
        error: "Invalid payload",
      });
    }

    const signature = request.headers["x-hub-signature-256"] as
      | string
      | undefined;

    const isValid = verifyGithubSignature(rawBody, signature);
    if (!isValid) {
      return reply.code(401).send({
        error: "Invalid webhook signature",
      });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody.toString("utf8"));
    } catch {
      return reply.code(400).send({ error: "Malformed JSON payload" });
    }

    const event = request.headers["x-github-event"];
    const deliveryId = request.headers["x-github-delivery"];
    const deliveryIdValue = Array.isArray(deliveryId)
      ? deliveryId[0]
      : deliveryId;

    if (!deliveryIdValue) {
      return reply
        .code(400)
        .send({ error: "Missing x-github-delivery header" });
    }

    // Deduplicate delivery IDs so GitHub retries/redeliveries are idempotent.
    const dedupeKey = `github:webhook:delivery:${deliveryIdValue}`;
    const dedupeResult = await fastify.redis.set(
      dedupeKey,
      "1",
      "EX",
      60 * 60 * 24,
      "NX",
    );

    if (dedupeResult !== "OK") {
      request.log.info(
        { deliveryId: deliveryIdValue, event },
        "Duplicate GitHub webhook delivery ignored",
      );
      return reply.code(200).send({
        ok: true,
        duplicate: true,
        event,
        deliveryId: deliveryIdValue,
      });
    }

    request.log.info(
      {
        event,
        deliveryId: deliveryIdValue,
        hasSecretConfigured: !!env.GITHUB_WEBHOOK_SECRET,
      },
      "GitHub webhook verified",
    );

    // TODO: persist event payload and processing state.
    return reply
      .code(202)
      .send({ ok: true, event, deliveryId: deliveryIdValue, payload });
  });
}

export default githubRoute;
