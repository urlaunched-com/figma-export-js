#!/usr/bin/env node

import { createVariablesFile, fetchComponentsApi, fetchStylesApi } from "./src/entities";
import { generateConfig } from "./src/commands";
import { getAssets, getStyleObject } from "./src/shared";
import { FILE_TYPE } from "./src/types";


const getFigmaAssets = async () => {
  const styles = await fetchStylesApi();
  const components = await fetchComponentsApi();
  await getStyleObject(styles, "colors");
  await getStyleObject(styles, "fonts");
  await createVariablesFile();
  await getAssets(components, FILE_TYPE.SVG, 'icons');
  await getAssets(components, FILE_TYPE.PNG, 'images');

}

const args = process.argv.slice(2);
switch (args[0]) {
  case 'init':
    generateConfig();
    break;
  default:
    getFigmaAssets();
    break;
}
