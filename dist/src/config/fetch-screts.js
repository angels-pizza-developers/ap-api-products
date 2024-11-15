"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSecrets = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const common_1 = require("@nestjs/common");
const fetchSecrets = async (secretName) => {
    const client = new client_secrets_manager_1.SecretsManagerClient({
        region: "ap-southeast-1",
    });
    try {
        const response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: secretName.toString().trim(),
        }));
        return JSON.parse(response.SecretString);
    }
    catch (error) {
        console.log("AWS SECRET MANAGER ERROR: ", JSON.stringify(error));
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: "Internal server error",
            message: "Internal server error",
            errorCode: "INTERNAL_SERVER_ERROR",
        }, common_1.HttpStatus.BAD_REQUEST);
    }
};
exports.fetchSecrets = fetchSecrets;
//# sourceMappingURL=fetch-screts.js.map