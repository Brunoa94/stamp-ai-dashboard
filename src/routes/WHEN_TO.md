# WHEN_TO

Use this folder for route registration files that define endpoints and attach schemas/controllers.

## Example

```ts
// src/routes/index.ts
fastify.get('/health', { schema: healthSchema }, healthController.getHealth);
```
