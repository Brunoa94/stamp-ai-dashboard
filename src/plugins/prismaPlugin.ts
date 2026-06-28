import fastifyPlugin from "fastify-plugin";
import { FastifyPluginAsync, FastifyInstance } from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fastifyPlugin(
  async (server: FastifyInstance) => {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }

    const prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });

    await prisma.$connect();

    server.decorate("prisma", prisma);
    server.addHook("onClose", async (server: FastifyInstance) => {
      await server.prisma.$disconnect();
    });
  },
);

export default prismaPlugin;
