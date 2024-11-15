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
exports.DriverUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let DriverUser = class DriverUser {
};
exports.DriverUser = DriverUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "DriverUserId" }),
    __metadata("design:type", String)
], DriverUser.prototype, "driverUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "UserId" }),
    __metadata("design:type", String)
], DriverUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], DriverUser.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], DriverUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], DriverUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], DriverUser.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "AccessGranted", default: () => "false" }),
    __metadata("design:type", Boolean)
], DriverUser.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], DriverUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], DriverUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], DriverUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.driverUser),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], DriverUser.prototype, "user", void 0);
exports.DriverUser = DriverUser = __decorate([
    (0, typeorm_1.Index)("DriverUser_Email_Active_idx", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("DriverUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("DriverUser_pkey", ["driverUserId"], { unique: true }),
    (0, typeorm_1.Index)("DriverUser_UserId_idx", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("DriverUser", { schema: "dbo" })
], DriverUser);
//# sourceMappingURL=DriverUser.js.map