// ======== Modification for file validateChatCompletionBody.js locatied at [/web/src/features/playground/server/validateChatCompletionBody.ts] =========

const newProperty = `
  toolCallingParams: z
    .object({
      parallelToolCalling: z.boolean().optional(),
      strict: z.boolean().optional(),
      toolChoice: z.any().optional(),
    })
    .nullable()
    .optional(),
`;
module.exports = [
  {
    id: "mod1",

    pattern:
      /(export\s+const\s+ChatCompletionBodySchema\s*=\s*z\.object\(\{\s*)([\s\S]*?)(\s*\}\);)/,
    replacement: (match, p1, p2, p3) =>
      `${p1}${p2 ? p2 : ""}${newProperty}${p3}`,
  },
];
