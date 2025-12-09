// ======== Modification for file fetchLLMCompletion.ts locatied at [/packages/shared/src/server/llm/fetchLLMCompletion.ts] =========

module.exports = [
  {
    id: "mod1",

    pattern:
      /const\s+langchainTools\s*=\s*tools\.map\(\(tool\)\s*=>\s*\(\{\s*type:\s*"function",\s*function:\s*tool,\s*\}\)\s*\);/,
    replacement: (match) => `${match}\n
            let bindToolsConfig;

            if (
              params?.toolCallingParams &&
              [LLMAdapter.OpenAI, LLMAdapter.GoogleAIStudio].includes(
                modelParams.adapter,
              )
            ) {
              bindToolsConfig = {
                tool_choice:
                  params.toolCallingParams?.toolChoice === "null"
                    ? null
                    : params.toolCallingParams.toolChoice,
                strict: params.toolCallingParams.strict,
                parallel_tool_calls: params.toolCallingParams.parallelToolCalls,
              };
            }\n`,
  },
  {
    id: "mod2",

    pattern: /\.bindTools\(langchainTools\)/,
    replacement: () => `.bindTools(langchainTools, bindToolsConfig)`,
  },
];
