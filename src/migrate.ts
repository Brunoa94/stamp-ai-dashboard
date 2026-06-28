import pg from "pg";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

async function runMigrations() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("Running migrations...");

    // Read and execute migration file
    const migrationPath = join(__dirname, "migrations", "001_create_users.sql");
    const migrationSQL = readFileSync(migrationPath, "utf-8");

    await pool.query(migrationSQL);
    console.log("✓ Migration 001_create_users.sql completed successfully");

    console.log("All migrations completed!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
