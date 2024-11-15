"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const swagger_1 = require("@nestjs/swagger");
const status_response_format_decorator_1 = require("../../common/decorators/status-response-format.decorator");
const use_api_response_format_decorator_1 = require("../../common/decorators/use-api-response-format.decorator");
const category_create_dto_1 = require("./dto/category.create.dto");
const category_update_dto_1 = require("./dto/category.update.dto");
const pagination_params_dto_1 = require("../../shared/dtos/pagination-params.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getPaginated(params) {
        try {
            return await this.categoryService.getPagination(params);
        }
        catch (e) {
            throw e;
        }
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findOne(id) {
        return this.categoryService.findOne(id);
    }
    update(id, dto) {
        return this.categoryService.update(id, dto);
    }
    remove(id) {
        return this.categoryService.remove(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)("/page"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../database/entities/Category").Category }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_create_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Category").Category }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Category").Category }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_update_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Category").Category }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, use_api_response_format_decorator_1.UseApiResponseFormat)("Request Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(200, "Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(404, "Resource not found"),
    (0, swagger_1.ApiTags)("category"),
    (0, common_1.Controller)("category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map