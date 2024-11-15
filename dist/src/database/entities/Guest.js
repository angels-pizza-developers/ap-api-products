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
exports.Guest = void 0;
const typeorm_1 = require("typeorm");
let Guest = class Guest {
};
exports.Guest = Guest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "GuestId" }),
    __metadata("design:type", String)
], Guest.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "SessionId" }),
    __metadata("design:type", String)
], Guest.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], Guest.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], Guest.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], Guest.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], Guest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], Guest.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileCountryCode", nullable: true }),
    __metadata("design:type", String)
], Guest.prototype, "mobileCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Guest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Guest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Guest.prototype, "active", void 0);
exports.Guest = Guest = __decorate([
    (0, typeorm_1.Index)("Guest_pkey", ["guestId"], { unique: true }),
    (0, typeorm_1.Entity)("Guest", { schema: "dbo" })
], Guest);
//# sourceMappingURL=Guest.js.map