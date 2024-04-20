import { fetchComponentsApi } from "../../components";
import { downloadImage, fetchFilesApi } from "../../files";
import { FILE_TYPE } from "../../../types";

export const getIcons = async () => {
  try {
    const components = await fetchComponentsApi();
    const icons = components.filter((component) => component.name.startsWith('ic'))
    const nodes = icons.map((item) => item.node_id).join(',');
    const images = await fetchFilesApi(nodes, FILE_TYPE.SVG);
    const imagesArray = Object.entries(images).map(([key, value]) => {
      const icon = icons.find(icon => icon.node_id === key);
      return {"key": icon ? icon.name.replace("ic/", "") : key, value};
    });

    await downloadImage(imagesArray, FILE_TYPE.SVG, "icons");

  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
