import { Static } from "@fastify/type-provider-typebox";
import { AdminSchema, CreateAdminSchema } from "../schemas/admin.schema.js";

export type AdminType = Static<typeof AdminSchema>;
export type CreateAdminType = Static<typeof CreateAdminSchema>;
