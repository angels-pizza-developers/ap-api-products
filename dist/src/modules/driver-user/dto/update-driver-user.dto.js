"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDriverUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_driver_user_dto_1 = require("./create-driver-user.dto");
class UpdateDriverUserDto extends (0, swagger_1.PartialType)(create_driver_user_dto_1.CreateDriverUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateDriverUserDto = UpdateDriverUserDto;
//# sourceMappingURL=update-driver-user.dto.js.map