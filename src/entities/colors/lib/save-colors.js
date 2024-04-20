"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveColors = void 0;
const shared_1 = require("../../../shared");
const saveColors = (nodesArray) => {
    const sassVariables = (0, shared_1.generateSassVariables)(nodesArray);
    (0, shared_1.saveToFile)(sassVariables, shared_1.OUTPUT_PATH.COLORS, shared_1.comment);
};
exports.saveColors = saveColors;
