import { IComponent } from "../../components";
import { downloadImage, fetchFilesApi } from "../../files";
import { FILE_TYPE } from "../../../types";
import { getConfigValue } from "../../../shared";

export const getImages = async (components: IComponent[]) => {
  try {
    const config = await getConfigValue();
    const filterPath = config.common.images;
    const regex = new RegExp(filterPath);
    const images = components.filter((component) => component.name.match(regex))
    if (!!images.length) {
      const nodes = images.map((item) => item.node_id).join(',');
      const listImages = await fetchFilesApi(nodes, FILE_TYPE.PNG);
      const ImagesArray = Object.entries(listImages).map(([key, value]) => {
        const image = images.find(image => image.node_id === key);
        const match = image ? image.name.match(regex) : null;
        return {"key": match ? match[2] : key, value};
      });

      await downloadImage(ImagesArray, FILE_TYPE.PNG, "images");
    } else {
      console.log(`Images with regex ${regex} not found`);
    }
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}
