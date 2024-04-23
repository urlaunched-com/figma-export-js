import fs from "fs";

export const generateConfig = () => {
  const config = `figma:
  fieldId: YOUR_FIGMA_FILE_ID
# [optional] Common export parameters
common:
  icons: "^(ic)/([a-z0-9_]+)$"
  images: "^(img)/([a-z0-9_]+)$"

path:
  styles: "./src/core/styles/_global"
  icons: "./public/assets/icons"
  images: "./public/assets/images"
  `
  fs.writeFileSync('figma-export.yaml', config);
  console.log('Generated figma-export.yaml');
}
