/*
  Warnings:

  - Added the required column `created_at` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "created_at" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "updated_at" DROP DEFAULT;
