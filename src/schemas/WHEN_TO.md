# WHEN_TO

Use this folder for JSON schema definitions used by Fastify for validation and serialization.

## Example

```ts
// src/schemas/health.schema.ts
const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: { status: { type: 'string' } },
      required: ['status'],
    },
  },
};
```
