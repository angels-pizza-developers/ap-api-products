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
exports.DriverUserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const driver_user_service_1 = require("./driver-user.service");
const create_driver_user_dto_1 = require("./dto/create-driver-user.dto");
const update_driver_user_dto_1 = require("./dto/update-driver-user.dto");
const swagger_1 = require("@nestjs/swagger");
let DriverUserController = class DriverUserController {
    constructor(driverUserService) {
        this.driverUserService = driverUserService;
    }
    create(createDriverUserDto) {
        return this.driverUserService.create(createDriverUserDto);
    }
    findAll() {
        return this.driverUserService.findAll();
    }
    findOne(id) {
        return this.driverUserService.findOne(+id);
    }
    update(id, updateDriverUserDto) {
        return this.driverUserService.update(+id, updateDriverUserDto);
    }
    remove(id) {
        return this.driverUserService.remove(+id);
    }
};
exports.DriverUserController = DriverUserController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_user_dto_1.CreateDriverUserDto]),
    __metadata("design:returntype", void 0)
], DriverUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DriverUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriverUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_driver_user_dto_1.UpdateDriverUserDto]),
    __metadata("design:returntype", void 0)
], DriverUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriverUserController.prototype, "remove", null);
exports.DriverUserController = DriverUserController = __decorate([
    (0, swagger_1.ApiTags)("driver-user"),
    (0, common_1.Controller)("driver-user"),
    __metadata("design:paramtypes", [driver_user_service_1.DriverUserService])
], DriverUserController);
//# sourceMappingURL=driver-user.controller.js.map