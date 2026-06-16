# WHEN_TO

Use this folder for request handlers that map HTTP requests to service calls and response shaping.

## Example

```ts
// src/controllers/health.controller.ts
import { getHealthStatus } from '../services/health.service';

export async function getHealth() {
  return getHealthStatus();
}
```
