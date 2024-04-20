"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFonts = void 0;
const shared_1 = require("../../../shared");
const saveFonts = (nodesArray) => {
    const sassVariables = (0, shared_1.generateSassVariables)(nodesArray);
    (0, shared_1.saveToFile)(sassVariables, shared_1.OUTPUT_PATH.FONTS, shared_1.comment);
};
exports.saveFonts = saveFonts;
