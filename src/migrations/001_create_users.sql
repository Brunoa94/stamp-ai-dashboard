CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30),
    "email" VARCHAR(30),
    "password" VARCHAR(255)
);