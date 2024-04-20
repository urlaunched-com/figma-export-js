import * as fs from "fs/promises";

export const getConfigValue = async (key: string): Promise<any> => {
  // Read the config file
  const configFile = await fs.readFile('.figma-export.json', 'utf-8');

  // Parse the file content to a JavaScript object
  const configObject = JSON.parse(configFile);
  // Return the value of the key
  return configObject[key];
}
