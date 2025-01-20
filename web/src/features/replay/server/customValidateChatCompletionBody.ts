import { z } from "zod";
import { ChatMessageRole, LLMAdapter } from "@langfuse/shared";

const ModelParamsSchema = z.object({
  provider: z.string(),
  adapter: z.nativeEnum(LLMAdapter),
  model: z.string(),
  temperature: z.number().optional(),
  max_tokens: z.number().optional(),
  top_p: z.number().optional(),
});

const MessageSchema = z.object({
  role: z.nativeEnum(ChatMessageRole),
  content: z.string(),
  id: z.string().optional(),
});

const ToolCallingParamsSchema = z.object({
  toolChoice: z.string().optional(),
  strict: z.boolean().optional(),
  parallelToolCalling: z.boolean().optional(),
});

export const ChatCompletionBodySchema = z.object({
  projectId: z.string(),
  messages: z.array(MessageSchema),
  modelParams: ModelParamsSchema,
  tools: z.array(z.any()).optional().nullable(),
  toolCallingParams: ToolCallingParamsSchema.optional().nullable(),
});

export const customValidateChatCompletionBody = (input: unknown) => {
  return ChatCompletionBodySchema.parse(input);
};

export type ValidatedChatCompletionBody = z.infer<
  typeof ChatCompletionBodySchema
>;
