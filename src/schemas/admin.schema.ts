import { Type } from "@fastify/type-provider-typebox";

export const AdminSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
});

export const getAllAdminsSchema = {
  response: {
    200: Type.Array(AdminSchema),
  },
};

export const CreateAdminSchema = Type.Pick(
  AdminSchema,
  ["name", "email", "password"],
  { additionalProperties: false },
);

export const createAdminSchema = {
  body: CreateAdminSchema,
  response: {
    200: AdminSchema,
  },
};
