# WHEN_TO

Use this folder for reusable request/response hooks and middleware-like logic (auth, validation flow, tracing).

## Example

```ts
// src/middlewares/request-id.middleware.ts
import { FastifyReply, FastifyRequest } from 'fastify';

export async function requestIdMiddleware(request: FastifyRequest, _reply: FastifyReply) {
  request.log.info({ requestId: request.id }, 'request started');
}
```
