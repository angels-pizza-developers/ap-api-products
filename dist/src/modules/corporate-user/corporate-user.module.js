"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateUserModule = void 0;
const common_1 = require("@nestjs/common");
const corporate_user_service_1 = require("./corporate-user.service");
const corporate_user_controller_1 = require("./corporate-user.controller");
const corporate_user_repository_1 = require("../../database/repositories/corporate-user.repository");
let CorporateUserModule = class CorporateUserModule {
};
exports.CorporateUserModule = CorporateUserModule;
exports.CorporateUserModule = CorporateUserModule = __decorate([
    (0, common_1.Module)({
        controllers: [corporate_user_controller_1.CorporateUserController],
        providers: [
            corporate_user_service_1.CorporateUserService,
            corporate_user_repository_1.CorporateUserRepository,
        ],
    })
], CorporateUserModule);
//# sourceMappingURL=corporate-user.module.js.map