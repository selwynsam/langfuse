const path = require("path");
const modifyFile = require("./modifyFile");

const fetchLLMCompletionModifications = require("./configs/fetchLLMCompletion");
const observationPreviewModifications = require("./configs/observationPreview");

const fetchLLMCompletionPath = path.join(
  __dirname,
  "../packages/shared/src/server/llm/fetchLLMCompletion.ts",
);
const observationPreviewPath = path.join(
  __dirname,
  "../web/src/components/trace/ObservationPreview.tsx",
);

modifyFile(fetchLLMCompletionPath, fetchLLMCompletionModifications);
modifyFile(observationPreviewPath, observationPreviewModifications);
