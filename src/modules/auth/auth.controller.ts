import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyBody, ErrorType } from "../../shared/types/shared.js";
import { LoginBodyType } from "./auth.schema.js";
import { AuthService } from "./auth.service.js";

export async function authenticate(
  request: FastifyRequest<FastifyBody<LoginBodyType>>,
  reply: FastifyReply,
) {
  try {
    const admin = await AuthService.authenticate(request.body);
    const token = request.server.jwt.sign(admin);

    return reply.code(200).send({ token });
  } catch (e) {
    const error = e as ErrorType;
    return reply.code(error.status).send(error.error);
  }
}
