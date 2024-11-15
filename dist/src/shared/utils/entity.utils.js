"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullName = void 0;
const getFullName = (firstName, middleInitial = "", lastName) => {
    if (middleInitial && middleInitial !== "") {
        return `${firstName} ${middleInitial} ${lastName}`;
    }
    else {
        return `${firstName} ${lastName}`;
    }
};
exports.getFullName = getFullName;
//# sourceMappingURL=entity.utils.js.map