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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const ProductCategory_1 = require("./ProductCategory");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ProductId" }),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Sku" }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ItemCode" }),
    __metadata("design:type", String)
], Product.prototype, "itemCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "Description", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Price", default: () => "0" }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Flavor", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "flavor", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsCombo", nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isCombo", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsBundle", nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isBundle", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsSingle", nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isSingle", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsFreebie", nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isFreebie", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "ImageUrl", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Product.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductCategory_1.ProductCategory, (productCategory) => productCategory.product),
    __metadata("design:type", Array)
], Product.prototype, "productCategories", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Index)("Product_pkey", ["productId"], { unique: true }),
    (0, typeorm_1.Entity)("Product", { schema: "dbo" })
], Product);
//# sourceMappingURL=Product.js.map