import Anthropic from "@anthropic-ai/sdk";

// Or explicitly pass it:
const AnthropicClient = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export { AnthropicClient };
