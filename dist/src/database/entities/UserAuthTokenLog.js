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
exports.UserAuthTokenLog = void 0;
const typeorm_1 = require("typeorm");
const UserAuth_1 = require("./UserAuth");
let UserAuthTokenLog = class UserAuthTokenLog {
};
exports.UserAuthTokenLog = UserAuthTokenLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserAuthTokenLogId" }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "userAuthTokenLogId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Token" }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "TokenType",
        enum: [
            "ACCESS",
            "REFRESH",
            "EMAIL_VERIFICATION",
            "PASSWORD_RESET",
            "MFA",
            "DEVICE_VERIFICATION",
            "API_KEY",
            "INVITE",
            "ACCOUNT_ACTIVATION",
            "SESSION",
            "REVOKE_ACCESS",
            "ONE_TIME_USE",
            "CONSENT_VERIFICATION",
            "TWO_FACTOR_AUTHENTICATION",
            "API_ACCESS",
            "SECURE_OPERATION",
            "EMAIL_UPDATE",
            "SOCIAL_LOGIN",
            "REGISTRATION",
            "ACCOUNT_DELETION",
            "AUTHORIZATION_CODE",
            "PERSONAL_ACCESS_TOKEN",
            "SESSION_REFRESH",
            "NOTIFICATION_SUBSCRIPTION",
            "SERVICE_AUTH",
            "RECOVERY",
        ],
    }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "tokenType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "IssuedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], UserAuthTokenLog.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", { name: "ExpiresAt" }),
    __metadata("design:type", Date)
], UserAuthTokenLog.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", { name: "UsedAt", nullable: true }),
    __metadata("design:type", Date)
], UserAuthTokenLog.prototype, "usedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "Status",
        enum: [
            "ACTIVE",
            "USED",
            "EXPIRED",
            "REVOKED",
            "INVALID",
            "PENDING",
            "FAILED",
            "LOCKED",
            "INACTIVE",
            "BLACKLISTED",
            "VERIFIED",
            "UNVERIFIED",
            "REISSUED",
            "CONSUMED",
            "SUPERSEDED",
            "INVALIDATED",
            "PENDING_VERIFICATION",
            "ERROR",
            "AWAITING_ACTION",
            "DENIED",
        ],
        default: () => "'ACTIVE'.auth_token_status_enum",
    }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "IpAddress", nullable: true }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserAgent", nullable: true }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Geolocation", nullable: true }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "geolocation", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FailedReason", nullable: true }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "failedReason", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "IsRevoked",
        nullable: true,
        default: () => "false",
    }),
    __metadata("design:type", Boolean)
], UserAuthTokenLog.prototype, "isRevoked", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", { name: "RevokedAt ", nullable: true }),
    __metadata("design:type", Date)
], UserAuthTokenLog.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], UserAuthTokenLog.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.userAuthTokenLogs),
    (0, typeorm_1.JoinColumn)([{ name: "UserAuthId", referencedColumnName: "userAuthId" }]),
    __metadata("design:type", UserAuth_1.UserAuth)
], UserAuthTokenLog.prototype, "userAuth", void 0);
exports.UserAuthTokenLog = UserAuthTokenLog = __decorate([
    (0, typeorm_1.Index)("UserAuthTokenLog_pkey", ["userAuthTokenLogId"], { unique: true }),
    (0, typeorm_1.Entity)("UserAuthTokenLog", { schema: "dbo" })
], UserAuthTokenLog);
//# sourceMappingURL=UserAuthTokenLog.js.map