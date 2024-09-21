import * as fs from "node:fs";
import path from "path";
import stream from "stream";
import cliProgress from "cli-progress";
import { getConfigValue } from "./get-config";

export const saveToFile = async (content: string, filePath: string, comment: string = '', isColor: boolean = false): Promise<void> => {
  const config = await getConfigValue();
  let directoryPath = config.figma.path[filePath];
  const fileName = `_${isColor ? 'colors' : 'fonts'}.scss`;
  const fullPath = path.join(directoryPath, fileName);

  // Check if directory exists
  if (!fs.existsSync(directoryPath)) {
    // If directory does not exist, create it
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Prepend the comment to the content
  const fileContent = comment ? `${comment}\n${content}` : content;

  const bar = new cliProgress.SingleBar({
    format: `Downloading ${isColor ? "colors" : "fonts"} variables |{bar}| {percentage}%`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    hideCursor: true
  }, cliProgress.Presets.shades_classic);

  bar.start(fileContent.length, 0);

  const contentStream = new stream.Readable();
  contentStream.push(fileContent);
  contentStream.push(null);

  const fileStream = fs.createWriteStream(fullPath);

  contentStream.on('data', (chunk) => {
    fileStream.write(chunk);
    bar.increment(chunk.length);
  });

  contentStream.on('end', () => {
    fileStream.end();
    bar.stop();
  });
}
