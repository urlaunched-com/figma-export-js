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
exports.fetchFilesApi = void 0;
const types_1 = require("../../../types");
const shared_1 = require("../../../shared");
const fetchFilesApi = (nodes, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, shared_1.API)(shared_1.ENDPOINTS.IMAGES, `?ids=${nodes}&format=${type}${type === types_1.FILE_TYPE.PNG || type === types_1.FILE_TYPE.JPG ? '&scale=3' : ''}`);
        return response.images;
    }
    catch (error) {
        console.error('Error during API call', error);
        throw error;
    }
});
exports.fetchFilesApi = fetchFilesApi;
