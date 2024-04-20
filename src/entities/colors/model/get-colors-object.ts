import { fetchStylesApi } from "../../styles";
import { INodesArray, STYLE_TYPE } from "../../../types";
import { fetchNodesApi } from "../../nodes";
import { rgbaToHex, saveColors } from "../lib";
import { processKey, useStyle } from "../../../shared";

export const getColorsObject = async () => {
  try {
    const styles = await fetchStylesApi();
    const colors = styles.filter((style) => style.style_type === STYLE_TYPE.FILL && useStyle(style));
    const nodes = await fetchNodesApi(colors)
    const nodesArray = Object.entries(nodes).map(([key, node]) => {
      if (!node.document.fills[0]?.color) {
        return null;
      }
      return {
        key: processKey(node.document.name),
        value: rgbaToHex(node.document.fills[0].color)
      };
    }).filter(Boolean);
    saveColors(nodesArray as INodesArray[]);
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
