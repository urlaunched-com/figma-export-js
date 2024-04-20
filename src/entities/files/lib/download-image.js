"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImage = void 0;
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const downloadImage = (imagesArray, fileType, directory) => {
    if (!fs_1.default.existsSync(directory)) {
        fs_1.default.mkdirSync(directory, { recursive: true });
    }
    const downloadPromises = imagesArray.map(image => new Promise((resolve, reject) => {
        const filePath = path_1.default.join(directory, `${image.key}.${fileType}`);
        const tempFilePath = path_1.default.join(directory, `${image.key}_temp.${fileType}`);
        const file = fs_1.default.createWriteStream(tempFilePath);
        https_1.default.get(image.value, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    if (fileType === 'png' || fileType === 'jpg') {
                        const webpFilePath = filePath.replace(`.${fileType}`, '.webp');
                        (0, sharp_1.default)(tempFilePath)
                            .webp({ quality: 75, minSize: true }) // Set the quality of the image
                            .toFile(webpFilePath)
                            .then(() => {
                            fs_1.default.unlinkSync(tempFilePath);
                            resolve(null);
                        })
                            .catch(err => {
                            fs_1.default.unlinkSync(tempFilePath);
                            reject(err.message);
                        });
                    }
                    else {
                        fs_1.default.renameSync(tempFilePath, filePath);
                        resolve(null);
                    }
                });
            });
        }).on('error', (err) => {
            fs_1.default.unlinkSync(tempFilePath);
            reject(err.message);
        });
    }));
    return Promise.all(downloadPromises);
};
exports.downloadImage = downloadImage;
