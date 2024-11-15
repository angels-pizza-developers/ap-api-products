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
exports.ProductOptionType = void 0;
const typeorm_1 = require("typeorm");
let ProductOptionType = class ProductOptionType {
};
exports.ProductOptionType = ProductOptionType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ProductOptionTypeId" }),
    __metadata("design:type", String)
], ProductOptionType.prototype, "productOptionTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], ProductOptionType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description", nullable: true }),
    __metadata("design:type", String)
], ProductOptionType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], ProductOptionType.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ProductOptionType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], ProductOptionType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], ProductOptionType.prototype, "active", void 0);
exports.ProductOptionType = ProductOptionType = __decorate([
    (0, typeorm_1.Index)("ProductOptionType_pkey", ["productOptionTypeId"], { unique: true }),
    (0, typeorm_1.Entity)("ProductOptionType", { schema: "dbo" })
], ProductOptionType);
//# sourceMappingURL=ProductOptionType.js.map