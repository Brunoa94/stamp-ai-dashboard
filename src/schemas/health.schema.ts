import { FastifySchema } from 'fastify';

const healthSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
      required: ['status'],
    },
  },
};

export default healthSchema;
