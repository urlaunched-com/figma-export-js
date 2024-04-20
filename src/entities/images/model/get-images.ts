import { fetchComponentsApi } from "../../components";
import { downloadImage, fetchFilesApi } from "../../files";
import { FILE_TYPE } from "../../../types";

export const getImages = async () => {
  try {
    const components = await fetchComponentsApi();
    const images = components.filter((component) => component.name.startsWith('img'))
    const nodes = images.map((item) => item.node_id).join(',');
    const listImages = await fetchFilesApi(nodes, FILE_TYPE.PNG);
    const ImagesArray = Object.entries(listImages).map(([key, value]) => {
      const image = images.find(image => image.node_id === key);
      return {"key": image ? image.name.replace("img/", "") : key, value};
    });

    await downloadImage(ImagesArray, FILE_TYPE.PNG, "images");

  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
