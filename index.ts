#!/usr/bin/env node

import { createVariablesFile, getColorsObject, getFontsObject, getIcons, getImages } from "./src/entities";
import { generateConfig } from "./src/commands";


const getAssets = async () => {
  await getColorsObject()
  await getFontsObject()
  await createVariablesFile();
  await getIcons()
  await getImages()
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
