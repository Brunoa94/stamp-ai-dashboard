import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { env } from "../config/env.js";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

const jwtPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  await server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  server.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

export default jwtPlugin;
