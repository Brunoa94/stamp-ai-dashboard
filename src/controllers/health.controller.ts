import { FastifyReply, FastifyRequest } from "fastify";
import { getHealthStatus } from "../services/health.service.js";

export async function getHealth(_request: FastifyRequest, reply: FastifyReply) {
  const response = getHealthStatus();

  return reply.code(200).send(response);
}
