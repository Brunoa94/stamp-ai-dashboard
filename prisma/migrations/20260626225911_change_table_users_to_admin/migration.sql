/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "email" VARCHAR(30),
    "password" VARCHAR(255),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
