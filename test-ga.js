import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient();

const propertyId = "263069069";

async function main() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],

    dimensions: [
      {
        name: "date",
      },
      {
        name: "eventName",
      },
      {
        name: "pagePath",
      },
      {
        name: "pageTitle",
      },
      {
        name: "customEvent:page_path",
      },
    ],

    metrics: [
      {
        name: "eventCount",
      },
      {
        name: "eventValue",
      },
    ],

    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "page_view",
        },
      },
    },
  });

  const rows = response.rows ?? [];

  for (const row of rows) {
    const date = row.dimensionValues?.[0]?.value ?? "";
    const eventName = row.dimensionValues?.[1]?.value ?? "";
    const pagePath = row.dimensionValues?.[2]?.value ?? "";
    const pageTitle = row.dimensionValues?.[3]?.value ?? "";
    const customPagePath = row.dimensionValues?.[4]?.value ?? "";
    const eventCount = row.metricValues?.[0]?.value ?? "0";
    const eventValue = row.metricValues?.[1]?.value ?? "0";

    console.log({
      date,
      eventName,
      pagePath,
      pageTitle,
      customPagePath,
      eventCount,
      eventValue,
    });
  }
}

main().catch(console.error);
