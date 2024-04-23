import { comment, generateSassVariables, saveToFile } from "../../../shared";
import { INodesArray } from "../../../types";

export const saveFonts = (nodesArray: INodesArray[]) => {
  const sassVariables = generateSassVariables(nodesArray);
  saveToFile(sassVariables, "styles", comment);
}
