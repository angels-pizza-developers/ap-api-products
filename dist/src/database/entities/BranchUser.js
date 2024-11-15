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
exports.BranchUser = void 0;
const typeorm_1 = require("typeorm");
const Branch_1 = require("./Branch");
const User_1 = require("./User");
let BranchUser = class BranchUser {
};
exports.BranchUser = BranchUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "BranchUserId" }),
    __metadata("design:type", String)
], BranchUser.prototype, "branchUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "UserId" }),
    __metadata("design:type", String)
], BranchUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], BranchUser.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], BranchUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], BranchUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], BranchUser.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "AccessGranted",
        nullable: true,
        default: () => "false",
    }),
    __metadata("design:type", Boolean)
], BranchUser.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], BranchUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], BranchUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], BranchUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Branch_1.Branch, (branch) => branch.branchUsers),
    (0, typeorm_1.JoinColumn)([{ name: "BranchId", referencedColumnName: "branchId" }]),
    __metadata("design:type", Branch_1.Branch)
], BranchUser.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.branchUser),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], BranchUser.prototype, "user", void 0);
exports.BranchUser = BranchUser = __decorate([
    (0, typeorm_1.Index)("BranchUser_Email_Active_idx", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("BranchUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("BranchUser_pkey", ["branchUserId"], { unique: true }),
    (0, typeorm_1.Index)("BranchUser_UserId_idx", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("BranchUser", { schema: "dbo" })
], BranchUser);
//# sourceMappingURL=BranchUser.js.map