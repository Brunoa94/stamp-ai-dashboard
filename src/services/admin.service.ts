import { prisma } from "../lib/prisma.js";
import { AdminMapper } from "../mappers/admin.mapper.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { AdminType, CreateAdminType } from "../types/admin.js";

async function createAdmin(body: CreateAdminType): Promise<AdminType> {
  try {
    const createdAdmin = await prisma.admin.create({
      data: await AdminMapper.createAdminMapper(body),
    });

    return AdminMapper.createAdminResponseMapper(createdAdmin);
  } catch (e) {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_ADMIN",
      description: "Failed to create admin",
    });
  }
}

async function getAllAdmins(): Promise<AdminType[]> {
  try {
    const allAdmins = await prisma.admin.findMany();

    return allAdmins;
  } catch (e) {
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_ADMIN",
      description: "Failed to get all admins",
    });
  }
}

export const AdminService = { createAdmin, getAllAdmins };
