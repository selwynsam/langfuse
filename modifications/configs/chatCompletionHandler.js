// ======== Modification for file chatCompletionHandler.ts locatied at [/web/src/features/playground/server/chatCompletionHandler.ts] =========

module.exports = [
  {
    id: "mod1",

    pattern: /(const\s*\{\s*)([\s\S]*?)(\s*\}\s*=\s*body;)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""}, toolCallingParams${p3}`,
  },
  {
    id: "mod4",
    pattern:
      /(if\s*\(\(tools\s*&&\s*tools\.length\s*>\s*0\)\s*\|\|\s*hasToolResults\)\s*\{[\s\S]*?const\s+result\s*=\s*await\s*\(fetchLLMCompletion\s+as\s+any\)\(\{\s*\.\.\.fetchLLMCompletionParams,\s*messages:\s*fixedMessages,\s*streaming:\s*false,\s*tools:\s*tools\s*\?\?\s*\[\],)([\s\S]*?)(\}\);)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}\n        toolCallingParams,${p2}${p3}`,
  },
];
