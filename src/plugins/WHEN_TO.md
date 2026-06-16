# WHEN_TO

Use this folder for Fastify plugins (decorators, shared instances, integrations, and plugin registrations).

## Example

```ts
// src/plugins/health.plugin.ts
import { FastifyPluginAsync } from 'fastify';

export const healthPlugin: FastifyPluginAsync = async (app) => {
  app.decorate('serviceName', 'stamp-ai-dashboard');
};
```
