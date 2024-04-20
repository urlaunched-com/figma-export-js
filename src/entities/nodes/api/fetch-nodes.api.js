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
exports.fetchNodesApi = void 0;
const shared_1 = require("../../../shared");
const fetchNodesApi = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nodes = data.map((item) => item.node_id).join(',');
        const response = yield (0, shared_1.API)(shared_1.ENDPOINTS.NODES, `?ids=${nodes}`);
        return response.nodes;
    }
    catch (error) {
        console.error('Error during API call', error);
        throw error;
    }
});
exports.fetchNodesApi = fetchNodesApi;
