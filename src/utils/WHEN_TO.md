# WHEN_TO

Use this folder for generic reusable helpers shared across modules (formatters, parsers, constants, small utilities).

## Example

```ts
// src/utils/normalize.ts
export function normalize(value: string) {
  return value.trim().toLowerCase();
}
```
