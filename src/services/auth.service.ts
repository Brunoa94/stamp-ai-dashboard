import { prisma } from "../lib/prisma.js";
import { Bcrypt } from "../lib/bcrypts.js";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { LoginBodyType } from "../schemas/auth.schema.js";

async function authenticate(
  body: LoginBodyType,
): Promise<{ id: string; email: string }> {
  const admin = await prisma.admin.findFirst({
    where: { email: body.email },
  });
  console.log("ADMIN: ", admin);
  if (!admin) {
    throw ErrorMapper.Create({
      status: 401,
      service: "SERVICE_AUTH",
      description: "Invalid credentials",
    });
  }

  const isValidPassword = await Bcrypt.decrypt({
    password: body.password,
    hash: admin.password,
  });

  if (!isValidPassword) {
    throw ErrorMapper.Create({
      status: 401,
      service: "SERVICE_AUTH",
      description: "Invalid credentials",
    });
  }

  return { id: admin.id, email: admin.email };
}

export const AuthService = { authenticate };
