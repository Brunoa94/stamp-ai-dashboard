# WHEN_TO

Use this folder for source code that runs the Fastify API application.

## Example

```ts
// src/app.ts
import Fastify from 'fastify';

export function buildApp() {
  return Fastify({ logger: true });
}
```
