import "fastify";
import { FastifyPostgres } from "fastify-postgres";

declare module "fastify" {
  interface FastifyRequest {
    rawBody?: Buffer;
  }

  interface FastifyInstance {
    pg: FastifyPostgres;
  }
}
