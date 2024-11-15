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
exports.PublicController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
let PublicController = class PublicController {
    constructor() { }
    seePublicImages(image, res) {
        const path = (0, path_1.join)(process.cwd(), "src/public/images", image);
        console.log(path);
        return res.sendFile(path);
    }
    seeAssets(image, res) {
        const path = (0, path_1.join)(process.cwd(), "src/public/assets", image);
        console.log(path);
        return res.sendFile(path);
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Get)("static/images/:imgpath"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("imgpath")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "seePublicImages", null);
__decorate([
    (0, common_1.Get)("static/assets/:fileName"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("fileName")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "seeAssets", null);
exports.PublicController = PublicController = __decorate([
    (0, swagger_1.ApiTags)("public"),
    (0, common_1.Controller)("public"),
    __metadata("design:paramtypes", [])
], PublicController);
//# sourceMappingURL=public.controller.js.map