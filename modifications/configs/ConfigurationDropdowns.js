// ======== Modification for file ConfigurationDropdowns.tsx located at [web/src/features/playground/page/components/ConfigurationDropdowns.tsx] =========

module.exports = [
  {
    id: "mod1",
    pattern:
      /(export\s+const\s+ConfigurationDropdowns:\s*React\.FC\s*=\s*\(\)\s*=>\s*\{)/,
    replacement: (match, p1) =>
      `import { ToolCallingParameters } from "@/src/features/playground/page/components/PlaygroundTools/ToolCallingParameters";\n\n${p1}`,
  },
  {
    id: "mod2",
    pattern:
      /(\s*<\/PopoverContent>\s*<\/Popover>)(\s*<\/div>\s*<\/div>\s*\);\s*\};)/,
    replacement: (match, p1, p2) =>
      `${p1}\n\n        <ToolCallingParameters />${p2}`,
  },
];
