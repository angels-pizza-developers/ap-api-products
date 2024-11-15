"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDuplicates = void 0;
const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
};
exports.hasDuplicates = hasDuplicates;
//# sourceMappingURL=array.utils.js.map