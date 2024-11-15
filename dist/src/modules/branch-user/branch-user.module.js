"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchUserModule = void 0;
const common_1 = require("@nestjs/common");
const branch_user_service_1 = require("./branch-user.service");
const branch_user_controller_1 = require("./branch-user.controller");
const branch_user_repository_1 = require("../../database/repositories/branch-user.repository");
let BranchUserModule = class BranchUserModule {
};
exports.BranchUserModule = BranchUserModule;
exports.BranchUserModule = BranchUserModule = __decorate([
    (0, common_1.Module)({
        controllers: [branch_user_controller_1.BranchUserController],
        providers: [
            branch_user_service_1.BranchUserService,
            branch_user_repository_1.BranchUserRepository,
        ],
    })
], BranchUserModule);
//# sourceMappingURL=branch-user.module.js.map