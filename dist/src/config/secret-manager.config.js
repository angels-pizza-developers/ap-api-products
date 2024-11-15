"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_screts_1 = require("./fetch-screts");
exports.default = async () => {
    const secretName = process.env.AWS_SECRETS_NAME;
    console.log("secretName", process.env.AWS_SECRETS_NAME);
    const secrets = await (0, fetch_screts_1.fetchSecrets)(secretName.toString().trim());
    console.log();
    return secrets;
};
//# sourceMappingURL=secret-manager.config.js.map