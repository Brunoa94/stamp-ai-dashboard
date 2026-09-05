import { Type } from "@fastify/type-provider-typebox";

export const ClaudePromptSchema = Type.Object({
  content: Type.String(),
});
