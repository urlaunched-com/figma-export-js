import { API, ENDPOINTS } from "../../../shared";
import { IStyle, IStylesResponse } from "../types";

export const fetchStylesApi = async ():Promise<IStyle[]> => {
  try {
    const styles: IStylesResponse = await API(ENDPOINTS.STYLES);
    return styles.meta.styles
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
