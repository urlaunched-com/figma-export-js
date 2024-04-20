import fs from "fs";

export const generateConfig = () => {
  const config = {
    "scss": "./src/core/styles/_global",
    "icons": "./public/assets/icons",
    "images": "./public/assets/images"
  }
  fs.writeFileSync('.figma-export.json', JSON.stringify(config, null, 2));
  console.log('Generated .figma-export.json');
}
