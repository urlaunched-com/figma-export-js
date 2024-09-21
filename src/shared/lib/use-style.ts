import { IStyle } from "../../entities";
import { IComponent } from "../../entities";

export const useStyle = (style: IStyle | IComponent) => {
  if (!style.description) {
    return true;
  }
  return !style.description.includes("none");
}
