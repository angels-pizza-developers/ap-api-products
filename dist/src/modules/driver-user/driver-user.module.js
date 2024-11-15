"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverUserModule = void 0;
const common_1 = require("@nestjs/common");
const driver_user_service_1 = require("./driver-user.service");
const driver_user_controller_1 = require("./driver-user.controller");
let DriverUserModule = class DriverUserModule {
};
exports.DriverUserModule = DriverUserModule;
exports.DriverUserModule = DriverUserModule = __decorate([
    (0, common_1.Module)({
        controllers: [driver_user_controller_1.DriverUserController],
        providers: [driver_user_service_1.DriverUserService],
    })
], DriverUserModule);
//# sourceMappingURL=driver-user.module.js.map