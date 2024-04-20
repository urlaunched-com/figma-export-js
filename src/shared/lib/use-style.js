"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyle = void 0;
const useStyle = (style) => {
    if (!style.description) {
        return true;
    }
    return !style.description.includes("none");
};
exports.useStyle = useStyle;
