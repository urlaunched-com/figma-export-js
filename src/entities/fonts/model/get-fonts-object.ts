import { IStyle } from "../../styles";
import { INodesArray, STYLE_TYPE } from "../../../types";
import { fetchNodesApi } from "../../nodes";
import { saveFonts } from "../lib";
import { processKey, useStyle } from "../../../shared";

export const getFontsObject = async (styles: IStyle[]) => {
  try {
    const fonts = styles.filter((style) => style.style_type === STYLE_TYPE.TEXT && useStyle(style));
    const nodes = await fetchNodesApi(fonts)
    const nodesArray = Object.entries(nodes).map(([key, node]) => {
      if (!node.document.style) {
        return null;
      }
      return {
        key: processKey(node.document.name),
        value: `${node.document.style.fontWeight} ${node.document.style.fontSize}px/${node.document.style.lineHeightPx}px var(--font-${node.document.style.fontFamily.toLowerCase().split(' ').join('-')}), sans-serif`
      };
    }).filter(Boolean);
    saveFonts(nodesArray as INodesArray[]);
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
