/*
  Warnings:

  - You are about to drop the column `date_range_end` on the `AnalyticsAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `date_range_start` on the `AnalyticsAnalysis` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `AnalyticsAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `AnalyticsAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalyticsAnalysis" DROP COLUMN "date_range_end",
DROP COLUMN "date_range_start",
ADD COLUMN     "end_date" VARCHAR(20) NOT NULL,
ADD COLUMN     "start_date" VARCHAR(20) NOT NULL;
