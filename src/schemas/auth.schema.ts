import { Type, Static } from "@fastify/type-provider-typebox";

export const LoginBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export type LoginBodyType = Static<typeof LoginBodySchema>;

const LoginResponseSchema = Type.Object({
  token: Type.String(),
});

const loginSchema = {
  body: LoginBodySchema,
  response: {
    200: LoginResponseSchema,
  },
};

export default loginSchema;
