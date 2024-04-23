import { IStyle } from "../../styles";
import { INodesArray, STYLE_TYPE } from "../../../types";
import { fetchNodesApi } from "../../nodes";
import { rgbaToHex, saveColors } from "../lib";
import { processKey, useStyle } from "../../../shared";

function figmaAngleToCss(angle: number) {
  return (90 - angle) % 360;
}

export const getColorsObject = async (styles: IStyle[]) => {
  try {
    const colors = styles.filter((style) => style.style_type === STYLE_TYPE.FILL);
    const nodes = await fetchNodesApi(colors)
    const nodesArray = Object.entries(nodes).map(([key, node]) => {
      if (!node.document.fills[0]?.color) {
        const gradientHandlePositions = node.document.fills[0].gradientHandlePositions;
        const gradientStops = node.document.fills[0].gradientStops;
        const cssGradient = `linear-gradient(${figmaAngleToCss(Math.atan2(gradientHandlePositions[1].y, gradientHandlePositions[1].x) * 180 / Math.PI)}deg, ${gradientStops.map(stop => `${rgbaToHex(stop.color)} ${stop.position * 100}%`).join(', ')})`;
        return {
          key: processKey(node.document.name),
          value: cssGradient

        };
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
