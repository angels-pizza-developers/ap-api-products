"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappingConfig = void 0;
const user_role_constant_1 = require("../shared/constants/user-role.constant");
exports.mappingConfig = {
    RegisterCustomerDtoToCreateUserDto: {
        username: (sourceValue, sourceObject) => {
            if (sourceObject.username && sourceObject.username !== "") {
                return sourceObject.username;
            }
            else if ((!sourceObject.username || sourceObject.username === "") &&
                sourceObject.email &&
                sourceObject.email !== "") {
                return sourceObject.email;
            }
            else {
                return null;
            }
        },
        role: (sourceValue, sourceObject) => user_role_constant_1.USER_ROLE.CUSTOMER,
    },
    RegisterCorporateDtoToCreateUserDto: {
        username: (sourceValue, sourceObject) => sourceObject.email,
        role: (sourceValue, sourceObject) => user_role_constant_1.USER_ROLE.CORPORATE,
    },
};
//# sourceMappingURL=mapping-config.js.map