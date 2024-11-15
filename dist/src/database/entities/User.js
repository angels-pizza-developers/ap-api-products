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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const BranchUser_1 = require("./BranchUser");
const CorporateUser_1 = require("./CorporateUser");
const CustomerUser_1 = require("./CustomerUser");
const DriverUser_1 = require("./DriverUser");
const Access_1 = require("./Access");
const UserAuth_1 = require("./UserAuth");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserId" }),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "Role",
        enum: ["CUSTOMER", "CORPORATE", "BRANCH", "DRIVER"],
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], User.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsVerified", default: () => "false" }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => BranchUser_1.BranchUser, (branchUser) => branchUser.user),
    __metadata("design:type", BranchUser_1.BranchUser)
], User.prototype, "branchUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => CorporateUser_1.CorporateUser, (corporateUser) => corporateUser.user),
    __metadata("design:type", CorporateUser_1.CorporateUser)
], User.prototype, "corporateUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => CustomerUser_1.CustomerUser, (customerUser) => customerUser.user),
    __metadata("design:type", CustomerUser_1.CustomerUser)
], User.prototype, "customerUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => DriverUser_1.DriverUser, (driverUser) => driverUser.user),
    __metadata("design:type", DriverUser_1.DriverUser)
], User.prototype, "driverUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Access_1.Access, (access) => access.users),
    (0, typeorm_1.JoinColumn)([{ name: "AccessId", referencedColumnName: "accessId" }]),
    __metadata("design:type", Access_1.Access)
], User.prototype, "access", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.user),
    __metadata("design:type", Array)
], User.prototype, "userAuths", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Index)("User_pkey", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("User", { schema: "dbo" })
], User);
//# sourceMappingURL=User.js.map