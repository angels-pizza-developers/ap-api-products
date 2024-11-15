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
exports.BranchUserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const branch_user_service_1 = require("./branch-user.service");
const swagger_1 = require("@nestjs/swagger");
const status_response_format_decorator_1 = require("../../common/decorators/status-response-format.decorator");
const use_api_response_format_decorator_1 = require("../../common/decorators/use-api-response-format.decorator");
const pagination_params_dto_1 = require("../../shared/dtos/pagination-params.dto");
const branch_user_create_dto_1 = require("./dto/branch-user.create.dto");
const branch_user_update_dto_1 = require("./dto/branch-user.update.dto");
let BranchUserController = class BranchUserController {
    constructor(branchUserService) {
        this.branchUserService = branchUserService;
    }
    async getPaginated(params) {
        return await this.branchUserService.getPagination(params);
    }
    create(createBranchUserDto) {
        return this.branchUserService.create(createBranchUserDto);
    }
    findOne(id) {
        return this.branchUserService.findOne(id);
    }
    async update(id, dto) {
        return await this.branchUserService.update(id, dto);
    }
    async remove(id) {
        return await this.branchUserService.remove(id);
    }
};
exports.BranchUserController = BranchUserController;
__decorate([
    (0, common_1.Post)("/page"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], BranchUserController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../database/entities/BranchUser").BranchUser }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_user_create_dto_1.CreateBranchUserDto]),
    __metadata("design:returntype", void 0)
], BranchUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/BranchUser").BranchUser }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/BranchUser").BranchUser }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, branch_user_update_dto_1.UpdateBranchUserDto]),
    __metadata("design:returntype", Promise)
], BranchUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/BranchUser").BranchUser }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BranchUserController.prototype, "remove", null);
exports.BranchUserController = BranchUserController = __decorate([
    (0, use_api_response_format_decorator_1.UseApiResponseFormat)("Request Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(200, "Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(404, "Resource not found"),
    (0, swagger_1.ApiTags)("branch-user"),
    (0, common_1.Controller)("branch-user"),
    __metadata("design:paramtypes", [branch_user_service_1.BranchUserService])
], BranchUserController);
//# sourceMappingURL=branch-user.controller.js.map