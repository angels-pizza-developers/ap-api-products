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
exports.ProductOptionValue = void 0;
const typeorm_1 = require("typeorm");
let ProductOptionValue = class ProductOptionValue {
};
exports.ProductOptionValue = ProductOptionValue;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ProductOptionValueId" }),
    __metadata("design:type", String)
], ProductOptionValue.prototype, "productOptionValueId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "ProductOptionId" }),
    __metadata("design:type", String)
], ProductOptionValue.prototype, "productOptionId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "ProductId" }),
    __metadata("design:type", String)
], ProductOptionValue.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], ProductOptionValue.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Price", default: () => "0" }),
    __metadata("design:type", String)
], ProductOptionValue.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsDefault", nullable: true }),
    __metadata("design:type", Boolean)
], ProductOptionValue.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ProductOptionValue.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], ProductOptionValue.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], ProductOptionValue.prototype, "active", void 0);
exports.ProductOptionValue = ProductOptionValue = __decorate([
    (0, typeorm_1.Index)("ProductOptionValue_pkey", ["productOptionValueId"], { unique: true }),
    (0, typeorm_1.Entity)("ProductOptionValue", { schema: "dbo" })
], ProductOptionValue);
//# sourceMappingURL=ProductOptionValue.js.map