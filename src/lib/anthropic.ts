import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env["ANTHROPIC_KEY"] || process.env["ANTHROPIC_API_KEY"];

// Accept both env names for backward compatibility across scripts/environments.
const AnthropicClient = new Anthropic({
  apiKey,
});

export { AnthropicClient };
