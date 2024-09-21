import { FILE_TYPE, INodesArray } from "../../../types";
import fs from "fs";
import https from "https";
import path from "path";
import sharp from "sharp";
import { getConfigValue } from "../../../shared";
import cliProgress from "cli-progress";

export const downloadImage = async (imagesArray: INodesArray[], fileType: string, directory: string) => {
  const config = await getConfigValue();
  const directoryPath = config.figma.path[directory];

  const bar = new cliProgress.SingleBar({
    format: `Downloading ${fileType === FILE_TYPE.SVG ? "icons" : "images"} |{bar}| {percentage}%`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    hideCursor: true
  }, cliProgress.Presets.shades_classic);

  bar.start(imagesArray.length, 0);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const downloadImageFile = (image: INodesArray) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(directoryPath, `${image.key}.${fileType}`);
      const tempFilePath = path.join(directoryPath, `${image.key}_temp.${fileType}`);
      const file = fs.createWriteStream(tempFilePath);

      https.get(image.value, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(async () => {
            try {
              if (fileType === 'png' || fileType === 'jpg') {
                const webpFilePath = filePath.replace(`.${fileType}`, '.webp');
                await sharp(tempFilePath)
                  .webp({ quality: 75, minSize: true })
                  .toFile(webpFilePath);
                fs.unlinkSync(tempFilePath);
              } else {
                fs.renameSync(tempFilePath, filePath);
              }
              bar.increment(); // Increment the progress bar by 1 for each file
              setTimeout(() => resolve(null), 100); // Add a small delay before resolving
            } catch (err: unknown) {
              fs.unlinkSync(tempFilePath);
              reject((err as Error).message);
            }
          });
        });
      }).on('error', (err: unknown) => {
        fs.unlinkSync(tempFilePath);
        reject((err as Error).message);
      });
    });
  };

  const downloadPromises = imagesArray.map(downloadImageFile);

  await Promise.all(downloadPromises);
  bar.stop();
};
