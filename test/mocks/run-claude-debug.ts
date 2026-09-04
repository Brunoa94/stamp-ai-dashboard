import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const scriptDir = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(scriptDir, "../../.env") });

async function run(): Promise<void> {
  console.log("[CLAUDE DEBUG] starting");

  const key = process.env["ANTHROPIC_KEY"] || process.env["ANTHROPIC_API_KEY"];
  if (!key) {
    throw new Error("Missing ANTHROPIC_KEY (or ANTHROPIC_API_KEY)");
  }

  console.log("[CLAUDE DEBUG] key_detected: yes");
  console.log("[CLAUDE DEBUG] model:", process.env["ANTHROPIC_MODEL"] || "claude-haiku-4-5-20251001");

  const { AnthropicClient } = await import("../../src/lib/anthropic.js");

  try {
    const message = await AnthropicClient.messages.create({
      model: process.env["ANTHROPIC_MODEL"] || "claude-haiku-4-5-20251001",
      max_tokens: 64,
      messages: [{ role: "user", content: "Reply with exactly: DEBUG_OK" }],
    });

    const first = message.content?.[0];
    const text = first && "text" in first ? first.text : "";
    console.log("[CLAUDE DEBUG] message_id:", message.id);
    console.log("[CLAUDE DEBUG] response_text:", text);
    console.log("[CLAUDE DEBUG] done");
  } catch (error) {
    console.error("[CLAUDE DEBUG] raw_error:");
    console.dir(error, { depth: null });
    process.exit(1);
  }
}

run().catch((error) => {
  console.error("[CLAUDE DEBUG] fatal_error:", error);
  process.exit(1);
});
