import { FastifyInstance } from 'fastify';
import * as healthController from '../controllers/health.controller';
import healthSchema from '../schemas/health.schema';

async function routes(fastify: FastifyInstance) {
  fastify.get('/health', { schema: healthSchema }, healthController.getHealth);
}

export default routes;
