import fastifyRedis from "@fastify/redis";
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";

const redisPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  await server.register(fastifyRedis, {
    url: "redis://127.0.0.1",
  });
});

export default redisPlugin;
