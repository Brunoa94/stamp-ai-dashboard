/*
  Warnings:

  - Made the column `name` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
