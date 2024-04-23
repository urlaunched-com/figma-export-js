import * as fs from "fs/promises";
import { parse } from 'yaml'


export const getConfigValue = async (): Promise<any> => {
  // Read the config file
  const configFile = await fs.readFile('figma-export.yaml', 'utf-8');

  // Parse the file content to a JavaScript object
  const configObject = parse(configFile);
  // Return the value of the key
  return configObject;
}
