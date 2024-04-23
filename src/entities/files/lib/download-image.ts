import { FILE_TYPE, INodesArray } from "../../../types";
import fs from "fs";
import https from "https";
import path from "path";
import sharp from "sharp";

import ProgressBar from 'progress';
import { getConfigValue } from "../../../shared";

export const downloadImage = async (imagesArray: INodesArray[], fileType: string, directory: string) => {
  const config = await getConfigValue();
  const directoryPath = config.path[directory];
  const bar = new ProgressBar(`Downloading ${fileType === FILE_TYPE.SVG ? "icons" : "images"} [:bar] :percent :etas`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: imagesArray.length
  });
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, {recursive: true});
  }
  const downloadPromises = imagesArray.map(image => new Promise((resolve, reject) => {
    const filePath = path.join(directoryPath, `${image.key}.${fileType}`);
    const tempFilePath = path.join(directoryPath, `${image.key}_temp.${fileType}`);
    const file = fs.createWriteStream(tempFilePath);
    https.get(image.value, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          if (fileType === 'png' || fileType === 'jpg') {
            const webpFilePath = filePath.replace(`.${fileType}`, '.webp');
            sharp(tempFilePath)
              .webp({quality: 75, minSize: true}) // Set the quality of the image
              .toFile(webpFilePath)
              .then(() => {
                fs.unlinkSync(tempFilePath);
                bar.tick();
                resolve(null);
              })
              .catch(err => {
                fs.unlinkSync(tempFilePath);
                reject(err.message);
              });
          } else {
            fs.renameSync(tempFilePath, filePath);
            bar.tick();
            resolve(null);
          }
        });
      });
    }).on('error', (err) => {
      fs.unlinkSync(tempFilePath);
      reject(err.message);
    });
  }));

  return Promise.all(downloadPromises);
}
