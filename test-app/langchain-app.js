import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import DATA from "./constants/data.js";
import {
  JsonOutputParser,
  StringOutputParser,
  BytesOutputParser,
} from "@langchain/core/output_parsers";
import { z } from "zod";
import { renderTextDescription } from "langchain/tools/render";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";
import { concat } from "@langchain/core/utils/stream";

const ChatMessageRole = {
  System: "system",
  User: "user",
  Assistant: "assistant",
};

async function initOpenAI() {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4o",
    // supportsStrictToolCalling: true,
    // callbacks: [new ConsoleCallbackHandler()], // for debugging
  });

  // Instantiate the parser
  const parser = new BytesOutputParser();

  const tools = [...DATA.tools];

  let finalMessages = DATA.messages.map((message) => {
    if (message.role === ChatMessageRole.User)
      return new HumanMessage(message.content);
    if (message.role === ChatMessageRole.System)
      return new SystemMessage(message.content);

    return new AIMessage(message.content);
  });

  const modelWithTools = model.bindTools(tools, {
    tool_choice: "required",
    strict: false,
    parallel_tool_calls: true,
  });

  // const response = await modelWithTools.invoke(finalMessages);

  // https://js.langchain.com/docs/how_to/tool_streaming/
  const stream = await modelWithTools.stream(finalMessages);

  let gathered = undefined;

  for await (const chunk of stream) {
    gathered = gathered !== undefined ? concat(gathered, chunk) : chunk;
    // console.log(gathered);
  }

  console.log(gathered.tool_call_chunks);
}

initOpenAI();
