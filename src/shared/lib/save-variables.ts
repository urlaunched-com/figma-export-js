import { generateSassVariables } from "./generate-sass-variables";
import { comment } from "../config";
import { INodesArray } from "../../types";
import { saveToFile } from "./save-to-file";

export const saveVariables = (nodesArray: INodesArray[], type: 'colors' | 'fonts') => {
  const sassVariables = generateSassVariables(nodesArray);
  const isColor = type === 'colors';
  saveToFile(sassVariables, 'styles', comment, isColor);
}