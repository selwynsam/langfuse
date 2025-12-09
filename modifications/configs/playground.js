// ======== Modification for file playground.tsx locatied at [/web/src/features/playground/page/playground.tsx] =========

module.exports = [
  {
    id: "mod1",

    pattern: /(export\s+default\s+function\s+Playground\(\)\s*\{)/,
    replacement: (
      match,
    ) => `import { ToolCallingParameters } from "./components/PlaygroundTools/ToolCallingParameters";\n
          ${match}`,
  },
  {
    id: "mod2",

    pattern: /<PlaygroundTools\s*\/>\s*<\/div>/,
    replacement: (match) => `${match}\n
      <div className="mb-4 max-h-[25vh] flex-shrink-0 overflow-y-auto">
          <ToolCallingParameters />
      </div>
    `,
  },
];
