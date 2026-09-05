import { Static } from "@fastify/type-provider-typebox";
import { ClaudePromptSchema } from "./claude.schema.js";

export type ClaudePromptType = Static<typeof ClaudePromptSchema>;
