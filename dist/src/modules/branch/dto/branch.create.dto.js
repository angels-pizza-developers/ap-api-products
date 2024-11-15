"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBranchDto = void 0;
const openapi = require("@nestjs/swagger");
const branch_base_dto_1 = require("./branch.base.dto");
class CreateBranchDto extends branch_base_dto_1.BaseBranchDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateBranchDto = CreateBranchDto;
//# sourceMappingURL=branch.create.dto.js.map