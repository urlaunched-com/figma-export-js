"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToFile = void 0;
const fs = __importStar(require("node:fs"));
const path_1 = __importDefault(require("path"));
const saveToFile = (content, filePath, comment = '') => {
    const directoryPath = path_1.default.dirname(filePath);
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
        // If directory does not exist, create it
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    // Check if file exists
    if (fs.existsSync(filePath)) {
        console.log(`File ${filePath} exists and will be overwritten.`);
    }
    // Prepend the comment to the content
    const fileContent = comment ? `${comment}\n${content}` : content;
    // Write the content to the file
    fs.writeFileSync(path_1.default.resolve(filePath), fileContent);
};
exports.saveToFile = saveToFile;
