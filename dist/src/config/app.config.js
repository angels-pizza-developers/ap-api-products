"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = createConfig;
function createConfig() {
    const env = process.env.NODE_ENV || "development";
    if (env && env !== "development") {
        return {
            envFilePath: [".env"],
        };
    }
    else {
        return {
            envFilePath: [".env", `.env.${process.env.NODE_ENV || "development"}`],
        };
    }
}
//# sourceMappingURL=app.config.js.map