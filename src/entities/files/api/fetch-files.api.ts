import { FILE_TYPE } from "../../../types";
import { API, ENDPOINTS } from "../../../shared";
import { IImage, IImagesResponse } from "../types";

export const fetchFilesApi = async (nodes: string, type: FILE_TYPE): Promise<IImage> => {
  try {
    const response:IImagesResponse = await API(ENDPOINTS.IMAGES, `?ids=${nodes}&format=${type}${type === FILE_TYPE.PNG || type === FILE_TYPE.JPG ? '&scale=3' : ''}`);
    return response.images
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
