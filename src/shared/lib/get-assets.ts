import { downloadImage, fetchFilesApi, IComponent } from "../../entities";
import { FILE_TYPE } from "../../types";
import { getConfigValue } from "./get-config";

export const getAssets = async (components: IComponent[], fileType: FILE_TYPE, assetType: 'icons' | 'images') => {
  try {
    const config = await getConfigValue();
    const filterPath = config.figma.common[assetType];
    const regex = new RegExp(filterPath);
    const assets = components.filter((component) => component.name.match(regex));
    if (assets.length) {
      const nodes = assets.map((item) => item.node_id).join(',');
      const files = await fetchFilesApi(nodes, fileType);
      const assetsArray = Object.entries(files).map(([key, value]) => {
        const asset = assets.find(asset => asset.node_id === key);
        const match = asset ? asset.name.match(regex) : null;
        return { "key": match ? match[2] : key, value };
      });

      await downloadImage(assetsArray, fileType, assetType);
    } else {
      console.log(`${assetType.charAt(0).toUpperCase() + assetType.slice(1)} with regex ${regex} not found`);
    }
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
}