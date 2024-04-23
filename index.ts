#!/usr/bin/env node

import {
  createVariablesFile, fetchComponentsApi,
  fetchStylesApi,
  getColorsObject,
  getFontsObject,
  getIcons,
  getImages
} from "./src/entities";
import { generateConfig } from "./src/commands";


const getAssets = async () => {
  const styles = await fetchStylesApi();
  const components = await fetchComponentsApi();
  await getColorsObject(styles)
  await getFontsObject(styles)
  await createVariablesFile();
  await getIcons(components)
  await getImages(components)
}

const args = process.argv.slice(2);
switch (args[0]) {
  case 'init':
    generateConfig();
    break;
  default:
    getAssets();
    break;
}
