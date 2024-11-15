"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnDefToTypeORMCondition = exports.convertColumnNotationToObject = exports.generateIndentityCode = void 0;
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const generateIndentityCode = (id) => {
    return String(id).padStart(6, "0");
};
exports.generateIndentityCode = generateIndentityCode;
const convertColumnNotationToObject = (notation, nestedValue) => {
    const object = {};
    let pointer = object;
    notation.split(".").map((key, index, arr) => {
        pointer = pointer[key] = index == arr.length - 1 ? nestedValue : {};
    });
    return object;
};
exports.convertColumnNotationToObject = convertColumnNotationToObject;
const columnDefToTypeORMCondition = (columnDef) => {
    const conditionMapping = [];
    for (var col of columnDef) {
        if (col.type === "date") {
            if ((0, moment_1.default)(new Date(col.filter), "MMM DD, YYYY", true).isValid() ||
                (0, moment_1.default)(new Date(col.filter), "MMMM DD, YYYY", true).isValid() ||
                (0, moment_1.default)(new Date(col.filter), "YYYY-MM-DD", true).isValid()) {
                conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, moment_1.default)(new Date(col.filter), "YYYY-MM-DD")));
            }
        }
        else if (col.type === "date-range") {
            const range = col.filter && col.filter.split(",").length > 0
                ? col.filter.split(",").filter((x) => x)
                : [];
            range[1] = range.length === 1 ? range[0] : range[1];
            if ((0, moment_1.default)(new Date(range[0]), "YYYY-MM-DD", true).isValid() &&
                (0, moment_1.default)(new Date(range[1]), "YYYY-MM-DD", true).isValid()) {
                conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.Between)(range[0], range[1])));
            }
        }
        else if (col.type === "option-yes-no") {
            if (col.filter &&
                col.filter !== "" &&
                ["yes", "no"].some((x) => x.toString().toLowerCase() ===
                    col.filter.toString().toLowerCase().trim())) {
                const value = col.filter.toString().toLowerCase().trim() === "yes";
                conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.In)([value])));
            }
        }
        else if (col.type === "number-range") {
            const range = col.filter.split("-").map((x) => x?.trim());
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.Between)(range[0], range[1])));
        }
        else if (col.type === "precise") {
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, col.filter));
        }
        else if (col.type === "not" || col.type === "except") {
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.Not)(col.filter)));
        }
        else if (col.type === "in" || col.type === "includes") {
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.In)(col.filter)));
        }
        else if (col.type === "null") {
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.IsNull)()));
        }
        else {
            conditionMapping.push((0, exports.convertColumnNotationToObject)(col.apiNotation, (0, typeorm_1.ILike)(`%${col.filter}%`)));
        }
    }
    const newArr = [];
    for (const item of conditionMapping) {
        const name = Object.keys(item)[0];
        if (newArr.some((x) => x[name])) {
            const index = newArr.findIndex((x) => x[name]);
            const res = Object.keys(newArr[index]).map((key) => newArr[index][key]);
            res.push(item[name]);
            newArr[index] = {
                [name]: Object.assign({}, ...res),
            };
            res.push(newArr[index]);
        }
        else {
            newArr.push(item);
        }
    }
    return Object.assign({}, ...newArr);
};
exports.columnDefToTypeORMCondition = columnDefToTypeORMCondition;
//# sourceMappingURL=database.utils.js.map