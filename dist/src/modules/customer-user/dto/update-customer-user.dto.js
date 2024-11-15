"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_customer_user_dto_1 = require("./create-customer-user.dto");
class UpdateCustomerUserDto extends (0, swagger_1.PartialType)(create_customer_user_dto_1.CreateCustomerUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCustomerUserDto = UpdateCustomerUserDto;
//# sourceMappingURL=update-customer-user.dto.js.map