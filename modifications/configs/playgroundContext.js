// ======== Modification for file index.tsx locatied at [/web/src/features/playground/page/context/index.tsx] =========

module.exports = [
  {
    id: "mod1",

    pattern:
      /const\s+\[tools,\s*setTools\]\s*=\s*useState<PlaygroundTool\[\]>\(\[\]\);/,
    replacement: (match) => `${match}\n
      const [toolCallingParams, setToolCallingParams] = useState({
        toolChoice: "auto",
        parallelToolCalling: true,
        strict: false,
      });
    `,
  },
  {
    id: "mod2",

    pattern: /(getChatCompletionWithTools\(\s*)([\s\S]*?)(\s*\))/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""} toolCallingParams${p3}`,
  },
  {
    id: "mod3",
    pattern:
      /(const handleSubmit\s*:\s*PlaygroundContextType\["handleSubmit"\]\s*=\s*useCallback\s*\(\s*async\s*\(\s*streaming\s*=\s*true\s*\)\s*=>\s*\{[\s\S]*?\},\s*\[[\s\S]*?)(structuredOutputSchema,\s*projectId,?\s*)(\],?\s*\);)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2}\n      toolCallingParams,\n    ],\n  );`,
  },
  {
    id: "mod4",

    pattern: /(<PlaygroundContext\.Provider\s+value=\{\{)([\s\S]*?)(\}\}\s*>)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""} toolCallingParams, setToolCallingParams, ${p3}`,
  },
  {
    id: "mod5",

    pattern:
      /(async\s+function\s+getChatCompletionWithTools\(\s*)([\s\S]*?)(\)\s*:\s*Promise<ToolCallResponse>\s*\{)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""} toolCallingParams${p3}`,
  },
  {
    id: "mod6",

    pattern: /(const\s+body\s*=\s*JSON\.stringify\(\{\s*)([\s\S]*?)(\s*\}\);)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""} toolCallingParams, ${p3}`,
  },
];
