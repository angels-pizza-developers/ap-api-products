"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const category_base_dto_1 = require("./category.base.dto");
class UpdateCategoryDto extends (0, swagger_1.PartialType)(category_base_dto_1.BaseCategoryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=category.update.dto.js.map