import {
  createMockAnthropicMessage,
  mockAnthropicCreateFailure,
  mockAnthropicCreateSuccess,
} from "./anthropic-client.mock.ts";
import { AnthropicClient } from "../../src/lib/anthropic.ts";

async function run(): Promise<void> {
  console.log("[MOCK TEST] starting");

  const restoreSuccess = mockAnthropicCreateSuccess(
    createMockAnthropicMessage("Terminal success"),
  );

  const success = await (AnthropicClient.messages.create as any)({});
  console.log("[MOCK TEST] SUCCESS_TEXT:", success.content?.[0]?.text);

  restoreSuccess();

  const restoreFailure = mockAnthropicCreateFailure(
    new Error("Terminal failure"),
  );

  try {
    await (AnthropicClient.messages.create as any)({});
  } catch (error: any) {
    console.log("[MOCK TEST] FAILURE_MESSAGE:", error?.message);
  } finally {
    restoreFailure();
  }

  console.log("[MOCK TEST] done");
}

run().catch((error) => {
  console.error("[MOCK TEST] unexpected error:", error);
  process.exit(1);
});
