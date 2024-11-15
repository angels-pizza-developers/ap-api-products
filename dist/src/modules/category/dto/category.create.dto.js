"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const category_base_dto_1 = require("./category.base.dto");
class CreateCategoryDto extends category_base_dto_1.BaseCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=category.create.dto.js.map