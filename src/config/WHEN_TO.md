# WHEN_TO

Use this folder for environment and runtime configuration files (ports, hosts, feature flags, etc.).

## Example

```ts
// src/config/env.ts
export const env = {
  PORT: Number(process.env.PORT) || 3000,
};
```
