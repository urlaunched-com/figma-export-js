/**
 *  rgbaToHex - convert rgba color to hex
 *  @param {IColor} color
 *  @returns {IColor}
 * **/

import { IColor } from "../../nodes/types";

export const rgbaToHex = (color: IColor): string => {
  let {r, g, b, a} = color;
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  a = Math.round(a * 255);
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1) + (a < 255 ? ((1 << 8) | a).toString(16).slice(1) : '');
}
