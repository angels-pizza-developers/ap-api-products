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
exports.PaymentOptions = void 0;
const typeorm_1 = require("typeorm");
let PaymentOptions = class PaymentOptions {
};
exports.PaymentOptions = PaymentOptions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "PaymentOptionId" }),
    __metadata("design:type", String)
], PaymentOptions.prototype, "paymentOptionId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], PaymentOptions.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], PaymentOptions.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "Brand",
        nullable: true,
        enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"],
    }),
    __metadata("design:type", String)
], PaymentOptions.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], PaymentOptions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], PaymentOptions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", nullable: true }),
    __metadata("design:type", Boolean)
], PaymentOptions.prototype, "active", void 0);
exports.PaymentOptions = PaymentOptions = __decorate([
    (0, typeorm_1.Index)("PaymentMethod_pkey", ["paymentOptionId"], { unique: true }),
    (0, typeorm_1.Entity)("PaymentOptions", { schema: "dbo" })
], PaymentOptions);
//# sourceMappingURL=PaymentOptions.js.map