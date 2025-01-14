import OpenAI from "openai";
import { observeOpenAI } from "langfuse";

const openai = observeOpenAI(
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  }),
  {
    clientInitParams: {
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_HOST,
      enabled: true,
    },
    generationName: "Traced generation",
    tags: ["tag1", "tag2"],
  },
);

// Example function to use OpenAI API
async function getOpenAIResponse(prompt) {
  try {
    const res = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Name a dog." }],
      model: "gpt-4o",
      max_tokens: 300,
    });

    console.log(res);

    console.log(res.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
  }
}

getOpenAIResponse("Tell me a story about a dog.");
