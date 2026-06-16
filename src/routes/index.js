const healthController = require('../controllers/health.controller');
const healthSchema = require('../schemas/health.schema');

async function routes(fastify) {
  fastify.get('/health', { schema: healthSchema }, healthController.getHealth);
}

module.exports = routes;
