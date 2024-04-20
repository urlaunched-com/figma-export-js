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
exports.getColorsObject = void 0;
const styles_1 = require("../../styles");
const types_1 = require("../../../types");
const nodes_1 = require("../../nodes");
const lib_1 = require("../lib");
const shared_1 = require("../../../shared");
const getColorsObject = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const styles = yield (0, styles_1.fetchStylesApi)();
        const colors = styles.filter((style) => style.style_type === types_1.STYLE_TYPE.FILL && (0, shared_1.useStyle)(style));
        const nodes = yield (0, nodes_1.fetchNodesApi)(colors);
        const nodesArray = Object.entries(nodes).map(([key, node]) => {
            var _a;
            if (!((_a = node.document.fills[0]) === null || _a === void 0 ? void 0 : _a.color)) {
                return null;
            }
            return {
                key: (0, shared_1.processKey)(node.document.name),
                value: (0, lib_1.rgbaToHex)(node.document.fills[0].color)
            };
        }).filter(Boolean);
        (0, lib_1.saveColors)(nodesArray);
    }
    catch (error) {
        console.error('Error during API call', error);
        throw error;
    }
});
exports.getColorsObject = getColorsObject;
