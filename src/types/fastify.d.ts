import "fastify";
import { FastifyPostgres } from "fastify-postgres";

declare module "fastify" {
  interface FastifyInstance {
    pg: FastifyPostgres;
  }
}
