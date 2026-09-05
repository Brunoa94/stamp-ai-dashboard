import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const scriptDir = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(scriptDir, "../../.env") });

async function run(): Promise<void> {
  console.log("[REAL CLAUDE TEST] starting");

  if (!process.env["ANTHROPIC_KEY"] && !process.env["ANTHROPIC_API_KEY"]) {
    throw new Error(
      "Missing ANTHROPIC_KEY (or ANTHROPIC_API_KEY). Export it before running this script.",
    );
  }

  const { ClaudeService } = await import("../../src/modules/claude/claude.service.js");

  const message = await ClaudeService.sendPrompt({
    content: "Reply with exactly: REAL_CLAUDE_OK",
  });

  const firstChunk = message.content?.[0];
  const text = firstChunk && "text" in firstChunk ? firstChunk.text : "";

  console.log("[REAL CLAUDE TEST] message_id:", message.id);
  console.log("[REAL CLAUDE TEST] model:", message.model);
  console.log("[REAL CLAUDE TEST] response_text:", text);
  console.log("[REAL CLAUDE TEST] done");
}

run().catch((error) => {
  console.error("[REAL CLAUDE TEST] error:", error);
  process.exit(1);
});
