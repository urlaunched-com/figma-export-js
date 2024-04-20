"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processKey = void 0;
const processKey = (key) => {
    return key.split('_')[0].replace(/\//g, '-').toLowerCase().replace(/\s/g, '-');
};
exports.processKey = processKey;
