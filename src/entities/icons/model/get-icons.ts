import { IComponent } from "../../components";
import { downloadImage, fetchFilesApi } from "../../files";
import { FILE_TYPE } from "../../../types";
import { getConfigValue } from "../../../shared";

export const getIcons = async (components: IComponent[]) => {
  try {
    const config = await getConfigValue();
    const filterPath = config.common.icons;
    const regex = new RegExp(filterPath);
    const icons = components.filter((component) => component.name.match(regex))
    if (icons.length) {
      const nodes = icons.map((item) => item.node_id).join(',');
      const images = await fetchFilesApi(nodes, FILE_TYPE.SVG);
      const imagesArray = Object.entries(images).map(([key, value]) => {
        const icon = icons.find(icon => icon.node_id === key);
        const match = icon ? icon.name.match(regex) : null;
        return {"key": match ? match[2] : key, value};
      });

      await downloadImage(imagesArray, FILE_TYPE.SVG, "icons");
    } else {
      console.log(`Icons with regex ${regex} not found`);
    }
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
