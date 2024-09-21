import fs from "fs";

export const generateConfig = () => {
  const config = `figma:
  fieldId: YOUR_FIGMA_FILE_ID
  common:
    icons: "^(ic)/([a-z0-9_]+)$"
    images: "^(img)/([a-z0-9_]+)$"
    variablesType: "scss" # scss or css. If css is selected, the file will be generated with css var variables
  path:
    styles: "./src/core/styles/_global"
    icons: "./public/assets/icons"
    images: "./public/assets/images"
  `
  fs.writeFileSync('figma-export.yaml', config);
  console.log('Generated figma-export.yaml');
}
