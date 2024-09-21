import { INodesArray, STYLE_TYPE } from "../../types";
import { getConfigValue, processKey, saveVariables, useStyle } from "../lib";
import { fetchNodesApi, IStyle, rgbaToHex } from "../../entities";

function figmaAngleToCss(angle: number) {
  return (90 - angle) % 360;
}

export const getStyleObject = async (styles: IStyle[], type: 'colors'|'fonts') => {
  try {
    const config = await getConfigValue();
    if (!config.figma.common) {
      throw new Error("Config 'common' section is missing");
    }
    const variablesType = config.figma.common.variablesType;

    const filteredStyles = styles.filter((style) => {
      if (type === 'colors') {
        return style.style_type === STYLE_TYPE.FILL;
      } else if (type === 'fonts') {
        return style.style_type === STYLE_TYPE.TEXT && useStyle(style);
      }
      return false;
    });

    const nodes = await fetchNodesApi(filteredStyles);
    const nodesArray = Object.entries(nodes).map(([key, node]) => {
      if (type === 'colors') {
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
      } else if (type === 'fonts') {
        if (!node.document.style) {
          return null;
        }
        const fontValue = `${node.document.style.fontWeight} ${node.document.style.fontSize}px/${node.document.style.lineHeightPx}px ${variablesType === 'scss' ? `${node.document.style.fontFamily}, sans-serif` : `var(--font-${node.document.style.fontFamily.toLowerCase().split(' ').join('-')}), sans-serif`}`;
        return {
          key: processKey(node.document.name),
          value: fontValue
        };
      }
      return null;
    }).filter(Boolean);

    saveVariables(nodesArray as INodesArray[], type);
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}