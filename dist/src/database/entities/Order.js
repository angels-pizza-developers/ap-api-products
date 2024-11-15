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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "OrderId" }),
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OrderNo" }),
    __metadata("design:type", String)
], Order.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "CartId" }),
    __metadata("design:type", String)
], Order.prototype, "cartId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ClaimNo", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "claimNo", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "CustomerUserId", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "customerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "GuestId", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], Order.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], Order.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileCountryCode", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "mobileCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "PaymentMethodId" }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "PaymentChangeFor", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "paymentChangeFor", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DeliveryAddress" }),
    __metadata("design:type", String)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { name: "LocationCoordinates", default: {} }),
    __metadata("design:type", Object)
], Order.prototype, "locationCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "CustomerAddressId" }),
    __metadata("design:type", String)
], Order.prototype, "customerAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "DeliveryFee", default: () => "0" }),
    __metadata("design:type", String)
], Order.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Disposition", enum: ["DELIVER", "PICK_UP"] }),
    __metadata("design:type", String)
], Order.prototype, "disposition", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "DispositionType", enum: ["NOW", "LATER"] }),
    __metadata("design:type", String)
], Order.prototype, "dispositionType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DispositionSchedule",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "dispositionSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PromoCode", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "promoCode", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Subtotal", default: () => "0" }),
    __metadata("design:type", String)
], Order.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Discount", default: () => "0" }),
    __metadata("design:type", String)
], Order.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "Total" }),
    __metadata("design:type", String)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "IsIncludeUtensils",
        nullable: true,
        default: () => "false",
    }),
    __metadata("design:type", Boolean)
], Order.prototype, "isIncludeUtensils", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SpecialInstructions", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "NotesToRider", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "notesToRider", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "OrderStatus",
        enum: [
            "ORDER_PLACED",
            "ORDER_ACCEPTED",
            "PREPARING_FOOD",
            "ORDER_READY_FOR_PICKUP",
            "DRIVER_ASSIGNED",
            "DRIVER_AT_RESTAURANT",
            "ORDER_PICKED_UP",
            "ON_THE_WAY",
            "ARRIVED_AT_DELIVERY_LOCATION",
            "ORDER_DELIVERED",
            "ORDER_CANCELED",
            "RE_DELIVERY_REQUESTED",
        ],
        default: () => "'ORDER_PLACED'.order_status_enum",
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "PendingStateAt",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "pendingStateAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CancelledStateAt",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "cancelledStateAt", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CancelReason", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "cancelReason", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AdditionalReason", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "additionalReason", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], Order.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Order.prototype, "active", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Index)("Order_pkey", ["orderId"], { unique: true }),
    (0, typeorm_1.Entity)("Order", { schema: "dbo" })
], Order);
//# sourceMappingURL=Order.js.map