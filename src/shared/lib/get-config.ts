import * as fs from "fs/promises";
import { parse } from 'yaml'


export const getConfigValue = async (): Promise<any> => {
  // Read the config file
  const configFile = await fs.readFile('figma-export.yaml', 'utf-8');

  // Return the value of the key
  return parse(configFile);
}
