import { Type } from "@fastify/type-provider-typebox";

const HealthResponseSchema = Type.Object({
  status: Type.String(),
});

const healthSchema = {
  response: {
    200: HealthResponseSchema,
  },
};

export default healthSchema;
