import Anthropic from "@anthropic-ai/sdk";
import { AnthropicClient } from "../../src/lib/anthropic.js";

export function createMockAnthropicMessage(
  text = "Mock Claude response",
): Anthropic.Message {
  return {
    id: "msg_mock_123",
    type: "message",
    role: "assistant",
    model: "claude-haiku-4-5-20251001",
    content: [{ type: "text", text }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: {
      input_tokens: 10,
      output_tokens: 6,
    },
  } as Anthropic.Message;
}

// Replaces Anthropic create call and returns a restore function.
export function mockAnthropicCreateSuccess(
  message: Anthropic.Message = createMockAnthropicMessage(),
): () => void {
  const previous = AnthropicClient.messages.create;

  AnthropicClient.messages.create = (async () => {
    return message;
  }) as typeof AnthropicClient.messages.create;

  return () => {
    AnthropicClient.messages.create = previous;
  };
}

// Replaces Anthropic create call with a rejected call and returns a restore function.
export function mockAnthropicCreateFailure(
  error: unknown = new Error("Mock Claude failure"),
): () => void {
  const previous = AnthropicClient.messages.create;

  AnthropicClient.messages.create = (async () => {
    throw error;
  }) as typeof AnthropicClient.messages.create;

  return () => {
    AnthropicClient.messages.create = previous;
  };
}
