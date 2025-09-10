const fs = require("fs");
const path = require("path");

const filesToFix = [
  "apps/frontend/src/hooks/useMutationListCreate.ts",
  "apps/frontend/src/hooks/useMutationListUpdate.ts",
  "apps/frontend/src/hooks/useMutationListDelete.ts",
  "apps/frontend/src/hooks/useMutationBoardCreate.ts",
  "apps/frontend/src/hooks/useMutationBoardUpdate.ts",
  "apps/frontend/src/hooks/useMutationUserUpdate.ts",
  "apps/frontend/src/lib/refreshTokenHandler.ts",
];

const envVarMappings = {
  "import.meta.env.VITE_API_WORKSPACES": "apiConfig.API_WORKSPACES",
  "import.meta.env.VITE_API_BOARDS": "apiConfig.API_BOARDS",
  "import.meta.env.VITE_API_LISTS": "apiConfig.API_LISTS",
  "import.meta.env.VITE_API_CARDS": "apiConfig.API_CARDS",
  "import.meta.env.VITE_API_USER": "apiConfig.API_USER",
  "import.meta.env.VITE_API_JWT_REFRESH": "apiConfig.API_JWT_REFRESH",
};

filesToFix.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf8");
    let modified = false;

    // Add import if not present and needed
    if (
      content.includes("import.meta.env.VITE_API") &&
      !content.includes("apiConfig")
    ) {
      const importPos = content.lastIndexOf("import ");
      if (importPos !== -1) {
        const nextLinePos = content.indexOf("\n", importPos);
        content =
          content.slice(0, nextLinePos) +
          "\nimport { apiConfig } from '../lib/apiConfig';" +
          content.slice(nextLinePos);
        modified = true;
      }
    }

    // Replace all environment variables
    for (const [oldVal, newVal] of Object.entries(envVarMappings)) {
      const regex = new RegExp(
        "\\$\\{" + oldVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\}",
        "g"
      );
      if (content.includes("${" + oldVal + "}")) {
        content = content.replace(regex, newVal);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log("Fixed:", filePath);
    }
  }
});

console.log("Done fixing files!");
