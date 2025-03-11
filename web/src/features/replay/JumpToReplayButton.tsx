// @ts-nocheck
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

import { createEmptyMessage } from "@/src/components/ChatMessages/utils/createEmptyMessage";
import { Button } from "@/src/components/ui/button";
import useCustomPlaygroundCache from "./page/hooks/useCustomPlaygroundCache";
import { type CustomPlaygroundCache } from "./page/hooks/useCustomPlaygroundCache";
import { PromptType } from "@/src/features/prompts/server/utils/validation";
import useProjectIdFromURL from "@/src/hooks/useProjectIdFromURL";
import {
  ChatMessageRole,
  type Observation,
  type Prompt,
  supportedModels as playgroundSupportedModels,
  type UIModelParams,
  ZodModelConfig,
} from "@langfuse/shared";

type JumpToReplayButtonProps = (
  | {
      source: "prompt";
      prompt: Prompt;
    }
  | {
      source: "generation";
      generation: Observation;
    }
) & {
  variant?: "outline" | "secondary";
};

export const JumpToReplayButton: React.FC<JumpToReplayButtonProps> = (
  props,
) => {
  const projectId = useProjectIdFromURL();
  const { setPlaygroundCache } = useCustomPlaygroundCache();
  const [capturedState, setCapturedState] =
    useState<CustomPlaygroundCache>(null);

  useEffect(() => {
    if (props.source === "prompt") {
      setCapturedState(parsePrompt(props.prompt));
    } else if (props.source === "generation") {
      setCapturedState(parseGeneration(props.generation));
    }
  }, [props]);

  const handleClick = () => {
    const updatedCacheStateObject = {
      ...capturedState,
      tools: null,
      toolCallingParams: null || {
        toolChoice: "none",
        strict: false,
        parallelToolCalling: false,
      },
    };

    if (props.source === "generation" && props?.generation?.input) {
      try {
        const parsedInput = JSON.parse(props.generation.input);
        updatedCacheStateObject.tools = parsedInput?.tools || [];
      } catch (e) {
        console.error(e);
      }

      updatedCacheStateObject.toolCallingParams = {
        toolChoice: "auto",
        parallelToolCalling: true,
        strict: false,
      };
    }

    setPlaygroundCache(updatedCacheStateObject as CustomPlaygroundCache);
  };

  return (
    <Button
      variant={props.variant ?? "secondary"}
      size={props.source === "prompt" ? "icon" : "default"}
      title="Replay LLM call"
      onClick={handleClick}
      asChild
    >
      <Link href={`/project/${projectId}/replay`}>
        <Terminal className="h-4 w-4" />
        {props.source === "generation" && <span className="ml-2">Replay</span>}
      </Link>
    </Button>
  );
};

const ParsedChatMessageListSchema = z.array(
  z.object({
    role: z.nativeEnum(ChatMessageRole),
    content: z.union([
      z.string(),
      // If system message is cached, the message is an array of objects with a text property
      z
        .array(
          z
            .object({
              text: z.string(),
            })
            .transform((v) => v.text),
        )
        .transform((v) => v.join("")),
      z.any().transform((v) => JSON.stringify(v, null, 2)),
    ]),
  }),
);

const parsePrompt = (prompt: Prompt): CustomPlaygroundCache => {
  if (prompt.type === PromptType.Chat) {
    const parsedMessages = ParsedChatMessageListSchema.safeParse(prompt.prompt);

    return parsedMessages.success ? { messages: parsedMessages.data } : null;
  } else {
    const promptString = prompt.prompt?.valueOf();

    return {
      messages: [
        createEmptyMessage(
          ChatMessageRole.System,
          typeof promptString === "string" ? promptString : "",
        ),
      ],
    };
  }
};

const parseGeneration = (generation: Observation): CustomPlaygroundCache => {
  if (generation.type !== "GENERATION") return null;

  const modelParams = parseModelParams(generation);
  let input = generation.input?.valueOf();

  if (typeof input === "string") {
    try {
      input = JSON.parse(input);

      if (typeof input === "string") {
        return {
          messages: [createEmptyMessage(ChatMessageRole.System, input)],
          modelParams,
        };
      }
    } catch (err) {
      return {
        messages: [
          createEmptyMessage(ChatMessageRole.System, input?.toString()),
        ],
        modelParams,
      };
    }
  }

  if (typeof input === "object") {
    const parsedMessages = ParsedChatMessageListSchema.safeParse(input);

    if (parsedMessages.success)
      return { messages: parsedMessages.data, modelParams };
  }

  if (typeof input === "object" && "messages" in input) {
    const parsedMessages = ParsedChatMessageListSchema.safeParse(
      input["messages"],
    );

    if (parsedMessages.success)
      return { messages: parsedMessages.data, modelParams };
  }

  return null;
};

function parseModelParams(
  generation: Observation,
):
  | (Partial<UIModelParams> & Pick<UIModelParams, "provider" | "model">)
  | undefined {
  const generationModel = generation.model?.valueOf();
  let modelParams:
    | (Partial<UIModelParams> & Pick<UIModelParams, "provider" | "model">)
    | undefined = undefined;

  if (generationModel) {
    const provider = Object.entries(playgroundSupportedModels).find(
      ([_, models]) =>
        generationModel ? models.some((m) => m === generationModel) : false,
    )?.[0];

    if (!provider) return;

    modelParams = {
      provider: { value: provider, enabled: true },
      model: { value: generationModel, enabled: true },
    } as Partial<UIModelParams> & Pick<UIModelParams, "provider" | "model">;

    const generationModelParams = generation.modelParameters?.valueOf();

    if (generationModelParams && typeof generationModelParams === "object") {
      const parsedParams = ZodModelConfig.safeParse(generationModelParams);

      if (parsedParams.success) {
        Object.entries(parsedParams.data).forEach(([key, value]) => {
          if (!modelParams) return;

          modelParams[key as keyof typeof parsedParams.data] = {
            value,
            enabled: true,
          };
        });
      }
    }
  }

  return modelParams;
}
