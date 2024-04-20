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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
require('dotenv').config();
const API = (path, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = path === config_1.ENDPOINTS.IMAGES ? `https://api.figma.com/v1${path}/${process.env.FIGMA_FIELD_ID}${query ? query : ''}`
            :
                `https://api.figma.com/v1/files/${process.env.FIGMA_FIELD_ID}${path}${query ? query : ''}`;
        const response = yield axios_1.default.get(url, {
            headers: {
                'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error during API call', error);
        return error;
    }
});
exports.API = API;
