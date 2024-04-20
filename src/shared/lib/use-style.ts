import { IStyle } from "../../entities/styles/types";
import { IComponent } from "../../entities";

export const useStyle = (style: IStyle | IComponent) => {
  if (!style.description) {
    return true;
  }
  return !style.description.includes("none");
}
