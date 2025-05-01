const path = require("path");
const modifyFile = require("./modifyFile");

const entitlementsModifications = require("./configs/entitlements");
const fetchLLMCompletionModifications = require("./configs/fetchLLMCompletion");
const playgroundModifications = require("./configs/playground");
const playgroundContextModifications = require("./configs/playgroundContext");
const chatCompletionHandlerModifications = require("./configs/chatCompletionHandler");
const validateChatCompletionBodyModifications = require("./configs/validateChatCompletionBody");
const nextConfigModifications = require("./configs/nextConfig");

const entitlementsPath = path.join(
  __dirname,
  "../web/src/features/entitlements/constants/entitlements.ts",
);

const fetchLLMCompletionPath = path.join(
  __dirname,
  "../packages/shared/src/server/llm/fetchLLMCompletion.ts",
);

const playgroundPath = path.join(
  __dirname,
  "../web/src/ee/features/playground/page/playground.tsx",
);

const playgroundContextPath = path.join(
  __dirname,
  "../web/src/ee/features/playground/page/context/index.tsx",
);

const chatCompletionHandlerPath = path.join(
  __dirname,
  "../web/src/ee/features/playground/server/chatCompletionHandler.ts",
);

const validateChatCompletionBodyPath = path.join(
  __dirname,
  "../web/src/ee/features/playground/server/validateChatCompletionBody.ts",
);

modifyFile(entitlementsPath, entitlementsModifications);
modifyFile(fetchLLMCompletionPath, fetchLLMCompletionModifications);
modifyFile(playgroundPath, playgroundModifications);
modifyFile(playgroundContextPath, playgroundContextModifications);
modifyFile(chatCompletionHandlerPath, chatCompletionHandlerModifications);
modifyFile(
  validateChatCompletionBodyPath,
  validateChatCompletionBodyModifications,
);

// Disabling sentry in next config.
modifyFile(
  path.join(__dirname, "../web/next.config.mjs"),
  nextConfigModifications,
);

// The below files appears to have eslint errors. Disabling eslint check for the below files
modifyFile(
  path.join(
    __dirname,
    "../web/src/features/prompts/server/actions/createPrompt.ts",
  ),
  [],
);
modifyFile(
  path.join(
    __dirname,
    "../web/src/features/prompts/server/routers/promptRouter.ts",
  ),
  [],
);
