import * as fs from "node:fs";
import path from "path";
import { getConfigValue } from "../../../shared";

export const createVariablesFile = async (): Promise<void> => {
  const config = await getConfigValue();
  const directoryPath = config.path.styles;

  // Define the content of the _variables.scss file
  const content = `
/*
* Start code generated using FigmaExportJS
*/
@import "colors";
@import "fonts";
/*
* End code generated using FigmaExportJS
*/
`;

  // Define the path to the _variables.scss file
  const filePath = path.join(directoryPath, '_variables.scss');

  // Write the content to the _variables.scss file
  await fs.writeFileSync(filePath, content);
}
