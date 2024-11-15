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
exports.BranchController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const branch_service_1 = require("./branch.service");
const pagination_params_dto_1 = require("../../shared/dtos/pagination-params.dto");
const branch_create_dto_1 = require("./dto/branch.create.dto");
const branch_update_dto_1 = require("./dto/branch.update.dto");
const swagger_1 = require("@nestjs/swagger");
let BranchController = class BranchController {
    constructor(branchService) {
        this.branchService = branchService;
    }
    async getPaginated(params) {
        return await this.branchService.getPagination(params);
    }
    create(createBranchDto) {
        return this.branchService.create(createBranchDto);
    }
    findOne(id) {
        return this.branchService.findOne(id);
    }
    update(id, dto) {
        return this.branchService.update(id, dto);
    }
    remove(id) {
        return this.branchService.remove(id);
    }
};
exports.BranchController = BranchController;
__decorate([
    (0, common_1.Post)("/page"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../database/entities/Branch").Branch }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_create_dto_1.CreateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Branch").Branch }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Branch").Branch }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, branch_update_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Branch").Branch }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "remove", null);
exports.BranchController = BranchController = __decorate([
    (0, swagger_1.ApiTags)("branch"),
    (0, common_1.Controller)("branch"),
    __metadata("design:paramtypes", [branch_service_1.BranchService])
], BranchController);
//# sourceMappingURL=branch.controller.js.map