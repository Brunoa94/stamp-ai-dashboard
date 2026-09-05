import { FastifyReply, FastifyRequest } from "fastify";
import { AdminService } from "./admin.service.js";
import { ErrorType, FastifyBody } from "../../shared/types/shared.js";
import { CreateAdminType } from "./admin.types.js";

export async function getAllAdmins(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllAdmins = await AdminService.getAllAdmins();

    return reply.status(200).send(getAllAdmins);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export async function createAdmin(
  request: FastifyRequest<FastifyBody<CreateAdminType>>,
  reply: FastifyReply,
) {
  try {
    const createAdmin = await AdminService.createAdmin(request.body);

    return reply.status(200).send(createAdmin);
  } catch (e) {
    const error = e as ErrorType;

    return reply.code(error.status).send(error.error);
  }
}

export const AdminController = { getAllAdmins, createAdmin };
