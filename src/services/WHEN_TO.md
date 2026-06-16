# WHEN_TO

Use this folder for business logic and integrations that should stay independent from HTTP concerns.

## Example

```ts
// src/services/health.service.ts
export function getHealthStatus() {
  return { status: 'ok' };
}
```
