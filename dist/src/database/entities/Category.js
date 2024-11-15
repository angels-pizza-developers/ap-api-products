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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const ProductCategory_1 = require("./ProductCategory");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CategoryId" }),
    __metadata("design:type", String)
], Category.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CategoryCode" }),
    __metadata("design:type", String)
], Category.prototype, "categoryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], Category.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ImageUrl", nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "SortOrder", nullable: true }),
    __metadata("design:type", Number)
], Category.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Category.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductCategory_1.ProductCategory, (productCategory) => productCategory.category),
    __metadata("design:type", Array)
], Category.prototype, "productCategories", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Index)("Category_Name_Active_idx", ["active", "name"], { unique: true }),
    (0, typeorm_1.Index)("Category_CategoryCode_Active_idx", ["active", "categoryCode"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("Category_pkey", ["categoryId"], { unique: true }),
    (0, typeorm_1.Entity)("Category", { schema: "dbo" })
], Category);
//# sourceMappingURL=Category.js.map