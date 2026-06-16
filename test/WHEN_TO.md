# WHEN_TO

Use this folder for automated tests (unit, integration, and route behavior checks).

## Example

```ts
// test/health.test.ts
test('GET /api/health returns app status', async () => {
  const response = await buildApp().inject({ method: 'GET', url: '/api/health' });
  assert.equal(response.statusCode, 200);
});
```
