-- CreateTable
CREATE TABLE "AnalyticsAnalysis" (
    "id" SERIAL NOT NULL,
    "analysis_type" VARCHAR(50) NOT NULL,
    "date_range_start" VARCHAR(20) NOT NULL,
    "date_range_end" VARCHAR(20) NOT NULL,
    "raw_analytics_data" JSONB NOT NULL,
    "analysis_result" JSONB NOT NULL,
    "model_used" VARCHAR(50) NOT NULL,
    "tokens_used" INTEGER,
    "processing_time_ms" INTEGER,
    "status" VARCHAR(20) NOT NULL DEFAULT 'completed',
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyticsAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsRecommendation" (
    "id" SERIAL NOT NULL,
    "analysis_id" INTEGER NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "priority" VARCHAR(20) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "expected_impact" VARCHAR(100),
    "implemented" BOOLEAN NOT NULL DEFAULT false,
    "implemented_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsRecommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnalyticsRecommendation" ADD CONSTRAINT "AnalyticsRecommendation_analysis_id_fkey" FOREIGN KEY ("analysis_id") REFERENCES "AnalyticsAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
