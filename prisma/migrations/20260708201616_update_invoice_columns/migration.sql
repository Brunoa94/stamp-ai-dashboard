/*
  Warnings:

  - You are about to drop the column `paymentProviderName` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_provider_name` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_paymentProviderName_fkey";

-- AlterTable - Rename column and add new columns with default values
ALTER TABLE "Invoice"
RENAME COLUMN "paymentProviderName" TO "payment_provider_name";

-- Add created_at and updated_at columns with default values
ALTER TABLE "Invoice"
ADD COLUMN "created_at" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN "updated_at" VARCHAR(50) NOT NULL DEFAULT '';

-- Update existing rows with current timestamp
UPDATE "Invoice"
SET "created_at" = TO_CHAR(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
    "updated_at" = TO_CHAR(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_payment_provider_name_fkey" FOREIGN KEY ("payment_provider_name") REFERENCES "PaymentProvider"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
