import { fetchStylesApi } from "../../styles";
import { INodesArray, STYLE_TYPE } from "../../../types";
import { fetchNodesApi } from "../../nodes";
import { saveFonts } from "../lib";
import { processKey, useStyle } from "../../../shared";

export const getFontsObject = async () => {
  try {
    const styles = await fetchStylesApi();
    const fonts = styles.filter((style) => style.style_type === STYLE_TYPE.TEXT && useStyle(style));
    const nodes = await fetchNodesApi(fonts)
    const nodesArray = Object.entries(nodes).map(([key, node]) => {
      if (!node.document.style) {
        return null;
      }
      return {
        key: processKey(node.document.name),
        value: `${node.document.style.fontSize}px/${node.document.style.lineHeightPx}px ${node.document.style.fontFamily} ${node.document.style.fontWeight}`
      };
    }).filter(Boolean);
    saveFonts(nodesArray as INodesArray[]);
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
