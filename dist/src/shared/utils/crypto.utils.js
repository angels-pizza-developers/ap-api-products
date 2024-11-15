"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const crypto_1 = require("crypto");
const generateOTP = () => {
    let otp;
    const uniqueOTPs = new Set();
    do {
        otp = (0, crypto_1.randomInt)(100000, 1000000).toString();
    } while (uniqueOTPs.has(otp));
    uniqueOTPs.add(otp);
    if (uniqueOTPs.size > 1000) {
        uniqueOTPs.clear();
    }
    return otp;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=crypto.utils.js.map