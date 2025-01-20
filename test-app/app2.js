import { Langfuse } from "langfuse"; // or "langfuse-node"
import DATA from "./constants/data.js";

const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY, // TODO: get from env
  publicKey: process.env.LANGFUSE_PUBLIC_KEY, // TODO: get from env
  baseUrl: process.env.LANGFUSE_HOST,
  // optional
  release: "v1.0.0",
  requestTimeout: 10000,
  enabled: true, // set to false to disable sending events
});

async function init() {
  const trace = langfuse.trace({
    name: "chat-app-session",
    userId: "user__935d7d1d-8625-4ef4-8651-544613e7bd22",
    metadata: { user: "user@langfuse.com" },
    tags: ["production"],
  });

  const generation = trace.generation({
    name: "chat-completion",
    model: "gpt-4o",
    modelParameters: {
      temperature: 0.9,
      maxTokens: 2000,
    },
    input: {
      messages: [...DATA.messages],
      tools: [...DATA.tools],
    },
  });

  generation.end({
    output: {
      content: null,
      role: "assistant",
      tool_calls: [
        {
          function: {
            arguments: {
              requests: [
                {
                  room: "Room 901",
                  job_item: "TV",
                  action: "inspect",
                  quantity: 1,
                  request_summary:
                    "Inspect the TV in Room 901 for casting issues.",
                },
              ],
            },
            name: "housekeeping",
          },
          id: "call_ULLU9cSty7xQXYZcr34Z4chc",
          type: "function",
        },
      ],
      function_call: null,
    },
  });

  // Now we want to flush and await all pending requests before the process exits
  await langfuse.shutdownAsync();
}

init();
