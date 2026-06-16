import Fastify from 'fastify';
import registerRoutes from './routes';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(registerRoutes, { prefix: '/api' });

  return app;
}
