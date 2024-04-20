"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = void 0;
const components_1 = require("../../components");
const files_1 = require("../../files");
const types_1 = require("../../../types");
const shared_1 = require("../../../shared");
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const components = yield (0, components_1.fetchComponentsApi)();
        const images = components.filter((component) => component.name.startsWith('img'));
        const nodes = images.map((item) => item.node_id).join(',');
        const listImages = yield (0, files_1.fetchFilesApi)(nodes, types_1.FILE_TYPE.PNG);
        const ImagesArray = Object.entries(listImages).map(([key, value]) => {
            const image = images.find(image => image.node_id === key);
            return { "key": image ? image.name.replace("img/", "") : key, value };
        });
        yield (0, files_1.downloadImage)(ImagesArray, types_1.FILE_TYPE.PNG, shared_1.OUTPUT_PATH.IMAGES);
    }
    catch (error) {
        console.error('Error during API call', error);
        throw error;
    }
});
exports.getImages = getImages;
