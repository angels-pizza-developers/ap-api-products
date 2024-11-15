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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccessDto = exports.AccessPagesDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AccessPagesDto {
    constructor() {
        this.view = false;
        this.modify = false;
        this.rights = [];
        this.accessPermissions = [];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => String }, view: { required: true, type: () => Object, default: false }, modify: { required: true, type: () => Object, default: false }, rights: { required: true, type: () => [String], default: [] }, accessPermissions: { required: true, type: () => Object, default: [] } };
    }
}
exports.AccessPagesDto = AccessPagesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AccessPagesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return obj[key].toString();
    }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Object)
], AccessPagesDto.prototype, "view", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return obj[key].toString();
    }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Object)
], AccessPagesDto.prototype, "modify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: String
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], AccessPagesDto.prototype, "rights", void 0);
class BaseAccessDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, accessPages: { required: true, type: () => [require("./access.base.dto").AccessPagesDto] } };
    }
}
exports.BaseAccessDto = BaseAccessDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BaseAccessDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: AccessPagesDto
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AccessPagesDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Array)
], BaseAccessDto.prototype, "accessPages", void 0);
//# sourceMappingURL=access.base.dto.js.map