import Anthropic from "@anthropic-ai/sdk";
import { ErrorMapper } from "../mappers/error.mapper.js";
import { AnthropicClient } from "../lib/anthropic.js";
import { ClaudePromptType } from "../types/claude.js";

const STATIC_PARAMS = {
  max_tokens: Number(process.env.ANTHROPIC_API_KEY) || 10000,
  model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
};

async function sendPrompt({
  content,
}: ClaudePromptType): Promise<Anthropic.Message> {
  try {
    const params: Anthropic.MessageCreateParams = {
      ...STATIC_PARAMS,
      messages: [{ role: "user", content }],
    };

    const message: Anthropic.Message =
      await AnthropicClient.messages.create(params);

    return message;
  } catch (e) {
    console.error(e);
    throw ErrorMapper.Create({
      status: 500,
      service: "SERVICE_CLAUDE",
      description: "Failed to send prompt to Claude",
    });
  }
}

export const ClaudeService = { sendPrompt };
