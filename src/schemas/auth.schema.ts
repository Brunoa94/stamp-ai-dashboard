import { Type, Static } from "@fastify/type-provider-typebox";

export const LoginBodySchema = Type.Object({
  email: Type.String({
    format: "email",
    description: "Admin email",
  }),
  password: Type.String({
    minLength: 8,
    description: "Admin password",
  }),
});

export type LoginBodyType = Static<typeof LoginBodySchema>;

const LoginResponseSchema = Type.Object({
  token: Type.String({
    description: "JWT bearer token",
  }),
});

const loginSchema = {
  tags: ["Auth"],
  summary: "Login",
  description: "Authenticates an admin and returns a JWT token.",
  operationId: "login",
  body: LoginBodySchema,
  response: {
    200: LoginResponseSchema,
    401: Type.Object({
      message: Type.String({
        examples: ["Invalid credentials"],
      }),
    }),
  },
};

export default loginSchema;
