"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const branch_user_base_dto_1 = require("./branch-user.base.dto");
class UpdateBranchUserDto extends (0, swagger_1.PartialType)(branch_user_base_dto_1.BaseBranchUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBranchUserDto = UpdateBranchUserDto;
//# sourceMappingURL=branch-user.update.dto.js.map