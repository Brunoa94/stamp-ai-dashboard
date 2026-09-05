import "dotenv/config";

export const env = {
  HOST: process.env.HOST || "0.0.0.0",
  PORT: Number(process.env.PORT) || 3002,
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET || "",
  POSTGRES_USER: process.env.POSTGRES_USER || "root",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "root",
  POSTGRES_DB: process.env.POSTGRES_DB || "fastifydb",
  POSTGRES_SERVICE: process.env.POSTGRES_SERVICE || "localhost",
  POSTGRES_PORT: process.env.POSTGRES_PORT || "5432",
};
