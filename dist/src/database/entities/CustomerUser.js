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
exports.CustomerUser = void 0;
const typeorm_1 = require("typeorm");
const CustomerAddress_1 = require("./CustomerAddress");
const User_1 = require("./User");
let CustomerUser = class CustomerUser {
};
exports.CustomerUser = CustomerUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CustomerUserId" }),
    __metadata("design:type", String)
], CustomerUser.prototype, "customerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "UserId" }),
    __metadata("design:type", String)
], CustomerUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], CustomerUser.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], CustomerUser.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MiddleName", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], CustomerUser.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "Birthdate", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ImageUrl", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileCountryCode", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "mobileCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CustomerUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], CustomerUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], CustomerUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FullName", nullable: true }),
    __metadata("design:type", String)
], CustomerUser.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerAddress_1.CustomerAddress, (customerAddress) => customerAddress.customerUser),
    __metadata("design:type", Array)
], CustomerUser.prototype, "customerAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.customerUser),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], CustomerUser.prototype, "user", void 0);
exports.CustomerUser = CustomerUser = __decorate([
    (0, typeorm_1.Index)("CustomerUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("CustomerUser_Email_Active_idx", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("CustomerUser_pkey", ["customerUserId"], { unique: true }),
    (0, typeorm_1.Index)("CustomerUser_UserId_idx", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("CustomerUser", { schema: "dbo" })
], CustomerUser);
//# sourceMappingURL=CustomerUser.js.map