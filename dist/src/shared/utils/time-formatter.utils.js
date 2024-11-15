"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHours = void 0;
const formatHours = (input = "") => {
    if (!input || input === "") {
        return "0 hour";
    }
    const regex = /^(\d+)hr$/i;
    const match = input.match(regex);
    if (match) {
        const hourValue = parseInt(match[1], 10);
        const hourLabel = hourValue === 1 ? "hour" : "hours";
        if (hourValue === 0) {
            return "0 hour";
        }
        return `${hourValue} ${hourLabel}`;
    }
    return "0 hour";
};
exports.formatHours = formatHours;
//# sourceMappingURL=time-formatter.utils.js.map