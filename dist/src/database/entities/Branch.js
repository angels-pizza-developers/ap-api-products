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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const BranchUser_1 = require("./BranchUser");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BranchId" }),
    __metadata("design:type", String)
], Branch.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "BranchCode", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "branchCode", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "Brand",
        nullable: true,
        enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"],
    }),
    __metadata("design:type", String)
], Branch.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Province", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "City", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Country", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Phone", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LocationCoordinates", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "locationCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Disposition", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "disposition", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "PaymentMethodIds",
        nullable: true,
        array: true,
        default: () => "'{}'[]",
    }),
    __metadata("design:type", Array)
], Branch.prototype, "paymentMethodIds", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "MinOrderValue", default: () => "0" }),
    __metadata("design:type", String)
], Branch.prototype, "minOrderValue", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "MaxOrderValue", default: () => "0" }),
    __metadata("design:type", String)
], Branch.prototype, "maxOrderValue", void 0);
__decorate([
    (0, typeorm_1.Column)("time with time zone", { name: "OpensAt", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "opensAt", void 0);
__decorate([
    (0, typeorm_1.Column)("time with time zone", { name: "ClosesAt", nullable: true }),
    __metadata("design:type", String)
], Branch.prototype, "closesAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "ClosedFrom", nullable: true }),
    __metadata("design:type", Date)
], Branch.prototype, "closedFrom", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "ClosedUntil", nullable: true }),
    __metadata("design:type", Date)
], Branch.prototype, "closedUntil", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsOperational", nullable: true }),
    __metadata("design:type", Boolean)
], Branch.prototype, "isOperational", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Branch.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BranchUser_1.BranchUser, (branchUser) => branchUser.branch),
    __metadata("design:type", Array)
], Branch.prototype, "branchUsers", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Index)("Branch_BranchCode_Active_idx", ["active", "branchCode"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("Branch_Name_Active_idx", ["active", "name"], { unique: true }),
    (0, typeorm_1.Index)("Branch_pkey", ["branchId"], { unique: true }),
    (0, typeorm_1.Entity)("Branch", { schema: "dbo" })
], Branch);
//# sourceMappingURL=Branch.js.map