// ======== Modification for file ObservationPreview.tsx locatied at [/web/src/components/trace/ObservationPreview.tsx] =========

module.exports = [
  // Adds JumpToReplayButton import before exporting ObservationPreview.
  {
    id: "mod1",
    pattern: /export\s+const\s+ObservationPreview\s*=\s*\(\s*{/,
    replacement: (
      match
    ) => `import { JumpToReplayButton } from "@/src/features/replay/JumpToReplayButton";\n
            ${match}`,
  },

  // This modification identifies a JSX pattern where 'type' is "GENERATION" and renders a <JumpToPlaygroundButton>.
  // It adds a <JumpToReplayButton> under the same condition, enabling both buttons to appear for "GENERATION" type.
  {
    id: "mod2",
    pattern:
      /\{observationWithInputAndOutput\.data\?\.type === "GENERATION" && \(\s*<JumpToPlaygroundButton[\s\S]*?\/>\s*\)\}/,
    replacement: (match) => `
        ${match}\n
        {observationWithInputAndOutput.data?.type === "GENERATION" && (
            <JumpToReplayButton
                source="generation"
                generation={observationWithInputAndOutput.data}
            />
        )}`,
  },
];
