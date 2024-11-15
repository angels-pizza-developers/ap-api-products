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
exports.CorporateUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let CorporateUser = class CorporateUser {
};
exports.CorporateUser = CorporateUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CorporateUserId" }),
    __metadata("design:type", String)
], CorporateUser.prototype, "corporateUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "UserId" }),
    __metadata("design:type", String)
], CorporateUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], CorporateUser.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], CorporateUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], CorporateUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], CorporateUser.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CorporateUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], CorporateUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "AccessGranted", default: () => "false" }),
    __metadata("design:type", Boolean)
], CorporateUser.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], CorporateUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.corporateUser),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], CorporateUser.prototype, "user", void 0);
exports.CorporateUser = CorporateUser = __decorate([
    (0, typeorm_1.Index)("CorporateUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("CorporateUser_Email_Active_idx", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("CorporateUser_pkey", ["corporateUserId"], { unique: true }),
    (0, typeorm_1.Index)("CorporateUser_UserId_idx", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("CorporateUser", { schema: "dbo" })
], CorporateUser);
//# sourceMappingURL=CorporateUser.js.map