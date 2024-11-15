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
exports.CustomerAddress = void 0;
const typeorm_1 = require("typeorm");
const CustomerUser_1 = require("./CustomerUser");
let CustomerAddress = class CustomerAddress {
};
exports.CustomerAddress = CustomerAddress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CustomerAddressId" }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "customerAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Province", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "City", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Barangay", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "barangay", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Building", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Subdivision", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "subdivision", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "HouseNumber", nullable: true }),
    __metadata("design:type", String)
], CustomerAddress.prototype, "houseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { name: "LocationCoordinates", default: {} }),
    __metadata("design:type", Object)
], CustomerAddress.prototype, "locationCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CustomerAddress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], CustomerAddress.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], CustomerAddress.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomerUser_1.CustomerUser, (customerUser) => customerUser.customerAddresses),
    (0, typeorm_1.JoinColumn)([
        { name: "CustomerUserId", referencedColumnName: "customerUserId" },
    ]),
    __metadata("design:type", CustomerUser_1.CustomerUser)
], CustomerAddress.prototype, "customerUser", void 0);
exports.CustomerAddress = CustomerAddress = __decorate([
    (0, typeorm_1.Index)("CustomerAddress_pkey", ["customerAddressId"], { unique: true }),
    (0, typeorm_1.Entity)("CustomerAddress", { schema: "dbo" })
], CustomerAddress);
//# sourceMappingURL=CustomerAddress.js.map