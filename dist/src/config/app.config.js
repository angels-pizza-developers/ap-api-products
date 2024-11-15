"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = createConfig;
const secret_manager_config_1 = __importDefault(require("./secret-manager.config"));
function createConfig() {
    const env = process.env.NODE_ENV || "development";
    if (env && env !== "development") {
        return {
            load: [secret_manager_config_1.default],
        };
    }
    else {
        return {
            envFilePath: [".env", `.env.${process.env.NODE_ENV || "development"}`],
        };
    }
}
//# sourceMappingURL=app.config.js.map