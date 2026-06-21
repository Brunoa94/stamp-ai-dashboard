import { z } from "zod";

const HealthResponseSchema = z.object({
  status: z.string(),
});

const healthSchema = {
  response: {
    200: HealthResponseSchema,
  },
};

export default healthSchema;
