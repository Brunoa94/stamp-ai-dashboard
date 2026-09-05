import { AdminModel } from "../../../generated/prisma/models.js";
import { Bcrypt } from "../../shared/lib/bcrypts.js";
import { AdminType, CreateAdminType } from "./admin.types.js";

const createAdminMapper = async (
  body: CreateAdminType,
): Promise<Omit<AdminType, "id">> => ({
  name: body.name ?? null,
  email: body.email ?? null,
  password: await Bcrypt.encrypt({ password: body.password }),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const createAdminResponseMapper = (body: AdminModel): AdminType => ({
  ...body,
});

export const AdminMapper = {
  createAdminMapper,
  createAdminResponseMapper,
};
