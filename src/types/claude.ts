import { Static } from "@fastify/type-provider-typebox";
import { ClaudePromptSchema } from "../schemas/claude.schema.js";

export type ClaudePromptType = Static<typeof ClaudePromptSchema>;
