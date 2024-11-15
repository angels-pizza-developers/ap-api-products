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
exports.AccessController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const access_service_1 = require("./access.service");
const access_update_dto_1 = require("./dto/access.update.dto");
const swagger_1 = require("@nestjs/swagger");
const pagination_params_dto_1 = require("../../shared/dtos/pagination-params.dto");
const use_api_response_format_decorator_1 = require("../../common/decorators/use-api-response-format.decorator");
const status_response_format_decorator_1 = require("../../common/decorators/status-response-format.decorator");
const access_create_dto_1 = require("./dto/access.create.dto");
let AccessController = class AccessController {
    constructor(accessService) {
        this.accessService = accessService;
    }
    async getPaginated(params) {
        return await this.accessService.getAccessPagination(params);
    }
    async create(dto) {
        return await this.accessService.create(dto);
    }
    async findOne(id) {
        return await this.accessService.findOne(id);
    }
    async update(id, dto) {
        return await this.accessService.update(id, dto);
    }
    async remove(id) {
        return await this.accessService.remove(id);
    }
};
exports.AccessController = AccessController;
__decorate([
    (0, common_1.Post)("/page"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../database/entities/Access").Access }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [access_create_dto_1.CreateAccessDto]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Access").Access }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Access").Access }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, access_update_dto_1.UpdateAccessDto]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/Access").Access }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessController.prototype, "remove", null);
exports.AccessController = AccessController = __decorate([
    (0, use_api_response_format_decorator_1.UseApiResponseFormat)("Request Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(200, "Success"),
    (0, status_response_format_decorator_1.StatusResponseFormat)(404, "Resource not found"),
    (0, swagger_1.ApiTags)("access"),
    (0, common_1.Controller)("access"),
    __metadata("design:paramtypes", [access_service_1.AccessService])
], AccessController);
//# sourceMappingURL=access.controller.js.map