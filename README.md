# stamp-ai-dashboard

Fastify API scaffold in TypeScript using a common folder structure.

✨ **Claude connected** - This project is set up for AI-assisted development with Claude.

## Run

```bash
npm install
npm start
```

`npm start` runs the API in watch mode and restarts on file save.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Project structure

- `src/`: application source code
- `src/config/`: runtime configuration
- `src/controllers/`: route handlers
- `src/middlewares/`: middleware/hooks logic
- `src/plugins/`: Fastify plugins
- `src/routes/`: route definitions
- `src/schemas/`: validation/serialization schemas
- `src/services/`: business logic
- `src/utils/`: shared helpers
- `test/`: automated tests

Each folder includes a `WHEN_TO.md` file with expected file usage and code examples.
