// This script modifies fetchLLMCompletion.ts locatied at [/packages/shared/src/server/llm/fetchLLMCompletion.ts]
const fs = require("fs");

const ANSI_ESCAPSE_CODE = {
  red: `\x1b[31m%s\x1b[0m`,
  green: `\x1b[32m%s\x1b[0m`,
};

function modifyFile(filePath, modifications) {
  try {
    const errors = [];

    // Read file content from the file
    let fileContent = fs.readFileSync(filePath, "utf8");

    // Add statement to disable ts-checks for the file
    const lineToAdd = "// @ts-nocheck";
    fileContent = `${lineToAdd}\n${fileContent}`;

    // Apply modifications
    modifications.forEach((mod) => {
      const matches = fileContent.match(mod.pattern);
      if (matches) {
        fileContent = fileContent.replace(mod.pattern, mod.replacement);
      } else {
        errors.push(`regex match failed for ${mod.id}`);
      }
    });

    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    // Write modified content to file
    fs.writeFileSync(filePath, fileContent);
    console.log(
      ANSI_ESCAPSE_CODE.green,
      `✔ MODIFICATION SUCCESSFUL: ${filePath}`,
    );
  } catch (error) {
    console.error(ANSI_ESCAPSE_CODE.red, "ERROR modifying file:", filePath);
    console.error(ANSI_ESCAPSE_CODE.red, error);
    process.exit(1);
  }
}

module.exports = modifyFile;
