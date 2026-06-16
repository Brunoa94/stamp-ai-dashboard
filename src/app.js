const Fastify = require('fastify');
const registerRoutes = require('./routes');

function buildApp() {
  const app = Fastify({ logger: true });

  app.register(registerRoutes, { prefix: '/api' });

  return app;
}

module.exports = { buildApp };
