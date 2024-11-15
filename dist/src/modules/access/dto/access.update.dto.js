"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const access_base_dto_1 = require("./access.base.dto");
class UpdateAccessDto extends (0, swagger_1.PartialType)(access_base_dto_1.BaseAccessDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAccessDto = UpdateAccessDto;
//# sourceMappingURL=access.update.dto.js.map