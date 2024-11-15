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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
let Cart = class Cart {
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CartId" }),
    __metadata("design:type", String)
], Cart.prototype, "cartId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "CustomerUserId", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "customerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "GuestId", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], Cart.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], Cart.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileCountryCode", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "mobileCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "PaymentMethodId" }),
    __metadata("design:type", String)
], Cart.prototype, "paymentMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "PaymentChangeFor", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "paymentChangeFor", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DeliveryAddress" }),
    __metadata("design:type", String)
], Cart.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { name: "LocationCoordinates", default: {} }),
    __metadata("design:type", Object)
], Cart.prototype, "locationCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "CustomerAddressId" }),
    __metadata("design:type", String)
], Cart.prototype, "customerAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "DeliveryFee", default: () => "0" }),
    __metadata("design:type", String)
], Cart.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Disposition", enum: ["DELIVER", "PICK_UP"] }),
    __metadata("design:type", String)
], Cart.prototype, "disposition", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "DispositionType", enum: ["NOW", "LATER"] }),
    __metadata("design:type", String)
], Cart.prototype, "dispositionType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DispositionSchedule",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Cart.prototype, "dispositionSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PromoCode", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "promoCode", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Subtotal", default: () => "0" }),
    __metadata("design:type", String)
], Cart.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Discount", default: () => "0" }),
    __metadata("design:type", String)
], Cart.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Total" }),
    __metadata("design:type", String)
], Cart.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "IsIncludeUtensils",
        nullable: true,
        default: () => "false",
    }),
    __metadata("design:type", Boolean)
], Cart.prototype, "isIncludeUtensils", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SpecialInstructions", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "NotesToRider", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "notesToRider", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "PendingStateAt",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Cart.prototype, "pendingStateAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CancelledStateAt",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Cart.prototype, "cancelledStateAt", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CancelReason", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "cancelReason", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AdditionalReason", nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "additionalReason", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], Cart.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Cart.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Cart.prototype, "active", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Index)("Cart_pkey", ["cartId"], { unique: true }),
    (0, typeorm_1.Entity)("Cart", { schema: "dbo" })
], Cart);
//# sourceMappingURL=Cart.js.map