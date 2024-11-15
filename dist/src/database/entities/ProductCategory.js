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
exports.ProductCategory = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Product_1 = require("./Product");
let ProductCategory = class ProductCategory {
};
exports.ProductCategory = ProductCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ProductCategoryId" }),
    __metadata("design:type", String)
], ProductCategory.prototype, "productCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], ProductCategory.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.productCategories),
    (0, typeorm_1.JoinColumn)([{ name: "CategoryId", referencedColumnName: "categoryId" }]),
    __metadata("design:type", Category_1.Category)
], ProductCategory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.productCategories),
    (0, typeorm_1.JoinColumn)([{ name: "ProductId", referencedColumnName: "productId" }]),
    __metadata("design:type", Product_1.Product)
], ProductCategory.prototype, "product", void 0);
exports.ProductCategory = ProductCategory = __decorate([
    (0, typeorm_1.Index)("ProductCategory_pkey", ["productCategoryId"], { unique: true }),
    (0, typeorm_1.Entity)("ProductCategory", { schema: "dbo" })
], ProductCategory);
//# sourceMappingURL=ProductCategory.js.map