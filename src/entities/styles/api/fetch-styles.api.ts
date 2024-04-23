import { API, ENDPOINTS, useStyle } from "../../../shared";
import { IStyle, IStylesResponse } from "../types";

export const fetchStylesApi = async ():Promise<IStyle[]> => {
  try {
    const styles: IStylesResponse = await API(ENDPOINTS.STYLES);
    return styles.meta.styles.filter((style) => useStyle(style));
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
