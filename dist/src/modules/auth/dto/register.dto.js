"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCustomerUserDto = void 0;
const openapi = require("@nestjs/swagger");
const user_create_dto_1 = require("../../user/dto/user.create.dto");
class RegisterCustomerUserDto extends user_create_dto_1.CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RegisterCustomerUserDto = RegisterCustomerUserDto;
//# sourceMappingURL=register.dto.js.map