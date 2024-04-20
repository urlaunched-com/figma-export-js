import * as fs from "node:fs";
import path from "path";
import ProgressBar from 'progress';
import stream from 'stream';
import { getConfigValue } from "./get-config";

export const saveToFile = async (content: string, filePath: string, comment: string = '', isColor: boolean = false): Promise<void> => {
  let directoryPath  = await getConfigValue(filePath);
  const fileName = `_${isColor ? 'colors' : 'fonts'}.scss`;
  const fullPath = path.join(directoryPath, fileName);

  // Check if directory exists
  if (!fs.existsSync(directoryPath)) {
    // If directory does not exist, create it
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Prepend the comment to the content
  const fileContent = comment ? `${comment}\n${content}` : content;

  const bar = new ProgressBar(`Downloading ${isColor ? "colors" : "fonts"} variables  [:bar] :percent :etas`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: fileContent.length // total length of the content to write
  });

  // Create a readable stream from the content
  const contentStream = new stream.Readable();
  contentStream.push(fileContent);
  contentStream.push(null);

  // Create a writable stream for the file
  const fileStream = fs.createWriteStream(fullPath);

  // Pipe the content to the file and update the progress bar
  contentStream.on('data', (chunk) => {
    fileStream.write(chunk);
    bar.tick(chunk.length);
  });

}
