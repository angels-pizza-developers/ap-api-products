"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCorporateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const corporate_user_base_dto_1 = require("./corporate-user.base.dto");
class UpdateCorporateUserDto extends (0, swagger_1.PartialType)(corporate_user_base_dto_1.BaseCorporateUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCorporateUserDto = UpdateCorporateUserDto;
//# sourceMappingURL=corporate-user.update.dto.js.map