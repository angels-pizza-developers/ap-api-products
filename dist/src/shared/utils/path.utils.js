"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePath = void 0;
const url_1 = __importDefault(require("url"));
const removePath = (fullUrl = "") => {
    const parsedUrl = url_1.default.parse(fullUrl);
    let path = parsedUrl.pathname;
    if (path.startsWith("/")) {
        path = path.replace(/^\/+/, "");
    }
    return path.replace(/\.[^/.]+$/, "");
};
exports.removePath = removePath;
//# sourceMappingURL=path.utils.js.map