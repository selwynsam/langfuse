// ======== Modification for file fetchLLMCompletion.ts locatied at [/packages/shared/src/server/llm/fetchLLMCompletion.ts] =========

module.exports = [
  // This pattern matches a line where the 'finalMessages' array is being filtered.
  // It specifically looks for the filtering operation that removes messages with empty content.
  // eg. finalMessages = finalMessages.filter((m) => m.content.length > 0);
  {
    id: "mod1",

    pattern:
      /(finalMessages = finalMessages\.filter\(\(m\) => m\.content\.length > 0\);)/,
    replacement: (match) => `
            ${match}\n
            const hasTools = params?.tools && params.tools.length > 0;
            let modelWithTools: any;\n`,
  },

  // This modification targets the instantiation of a new ChatOpenAI model.
  // The pattern matches the line where a new ChatOpenAI object is created with its configuration.
  // It captures the entire line to ensure the replacement is correctly positioned after the model creation.
  {
    id: "mod2",
    pattern: /(chatModel\s*=\s*new\s*ChatOpenAI\(\s*\{[\s\S]*?\}\s*\);)/,
    replacement: (match) => `
            ${match}\n
            if (hasTools) {
                modelWithTools = chatModel.bindTools(params.tools ?? [], {
                    tool_choice:
                        params.toolCallingParams?.toolChoice === "null"
                            ? null
                            : params.toolCallingParams.toolChoice,
                    strict: params.toolCallingParams.strict,
                    parallel_tool_calls: params.toolCallingParams.parallelToolCalls,
                });
            }\n`,
  },

  // This modification pattern looks for an 'if' statement that checks the 'streaming' condition
  // adds a conditional check before the existing streaming logic.
  // It checks if tools are available and if the model with tools is initialized.
  // If both conditions are met, it invokes the model with tools using the final messages
  // and returns the completion and processTracedEvents. This allows for tool-based
  // processing before falling back to the standard streaming logic.
  {
    id: "mod3",
    pattern:
      /(if \(streaming\) \{\n\s*return \{\n\s*completion: await chatModel\n\s*\.pipe\(new BytesOutputParser\(\)\)\n\s*\.stream\(finalMessages, runConfig\),\n\s*processTracedEvents,\n\s*\};\n\s*\})/,
    replacement: (match) => `
              if (hasTools && modelWithTools) {
                  return {
                  completion: await modelWithTools.invoke(finalMessages),
                  processTracedEvents,
                  };
              }
  
            ${match} \n`,
  },
];
