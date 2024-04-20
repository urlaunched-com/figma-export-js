import { API, ENDPOINTS } from "../../../shared";
import { IComponent, IComponentsResponse } from "../types";

export const fetchComponentsApi = async ():Promise<IComponent[]> => {
  try {
    const components: IComponentsResponse = await API(ENDPOINTS.COMPONENTS);
    return components.meta.components
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
