"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const branch_base_dto_1 = require("./branch.base.dto");
class UpdateBranchDto extends (0, swagger_1.PartialType)(branch_base_dto_1.BaseBranchDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBranchDto = UpdateBranchDto;
//# sourceMappingURL=branch.update.dto.js.map