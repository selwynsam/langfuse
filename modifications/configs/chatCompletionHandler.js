// ======== Modification for file chatCompletionHandler.ts locatied at [/web/src/features/playground/server/chatCompletionHandler.ts] =========

module.exports = [
  {
    id: "mod1",

    pattern: /(const\s*\{\s*)([\s\S]*?)(\s*\}\s*=\s*body;)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""}, toolCallingParams${p3}`,
  },
  {
    id: "mod2",

    pattern:
      /(if\s*\(\(tools\s*&&\s*tools\.length\s*>\s*0\)\s*\|\|\s*structuredOutputSchema\)\s*\{\s*const\s*\{\s*completion\s*\}\s*=\s*await\s*fetchLLMCompletion\(\{\s*)([\s\S]*?)(\s*\}\);)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""} toolCallingParams${p3}`,
  },
];
