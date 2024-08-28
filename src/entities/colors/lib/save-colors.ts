import { comment, generateSassVariables, saveToFile } from "../../../shared";
import { INodesArray } from "../../../types";


export const saveColors = (nodesArray: INodesArray[]) => {
  const sassVariables = generateSassVariables(nodesArray);
  saveToFile(sassVariables, 'styles', comment, true);
}
