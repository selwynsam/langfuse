// @ts-nocheck
import { StreamingTextResponse, LangChainAdapter } from "ai";
import { NextResponse, type NextRequest } from "next/server";

import {
  BaseError,
  InternalServerError,
  InvalidRequestError,
} from "@langfuse/shared";

// import { PosthogCallbackHandler } from "../analytics/posthogCallback";
// import { authorizeRequestOrThrow } from "../authorizeRequest";
import { customValidateChatCompletionBody } from "./customValidateChatCompletionBody";

import { prisma } from "@langfuse/shared/src/db";
import { decrypt } from "@langfuse/shared/encryption";
import {
  LLMApiKeySchema,
  logger,
  customFetchLLMCompletion,
} from "@langfuse/shared/src/server";

export default async function customChatCompletionHandler(req: NextRequest) {
  try {
    const body = customValidateChatCompletionBody(await req.json());
    // const { userId } = await authorizeRequestOrThrow(body.projectId);

    const { messages, modelParams } = body;

    const LLMApiKey = await prisma.llmApiKeys.findFirst({
      where: {
        projectId: body.projectId,
        provider: modelParams.provider,
      },
    });

    if (!LLMApiKey)
      throw new InvalidRequestError(
        `No ${modelParams.provider} API key found in project. Please add one in the project settings.`,
      );

    const parsedKey = LLMApiKeySchema.safeParse(LLMApiKey);
    if (!parsedKey.success) {
      throw new InternalServerError(
        `Could not parse API key for provider ${body.modelParams.provider}: ${parsedKey.error.message}`,
      );
    }

    const { completion } = await customFetchLLMCompletion({
      messages,
      modelParams,
      streaming: true,
      callbacks: [], // [new PosthogCallbackHandler("playground", body, usesrId)],
      apiKey: decrypt(parsedKey.data.secretKey),
      baseURL: parsedKey.data.baseURL || undefined,
      config: parsedKey.data.config,
      tools: body.tools,
      toolCallingParams: body.toolCallingParams,
    });

    if (body.tools && body.tools.length > 0) {
      return NextResponse.json({ isJson: true, completion }, { status: 200 });
    }

    // return LangChainAdapter.toDataStreamResponse(completion as ReadableStream);

    return new StreamingTextResponse(completion as ReadableStream);
  } catch (err) {
    logger.error("Failed to handle chat completion", err);

    if (err instanceof BaseError) {
      return NextResponse.json(
        {
          error: err.name,
          message: err.message,
        },
        { status: err.httpCode },
      );
    }

    if (err instanceof Error) {
      return NextResponse.json(
        {
          message: err.message,
          error: err,
        },
        { status: 500 },
      );
    }

    throw err;
  }
}
