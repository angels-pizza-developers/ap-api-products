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
exports.UserAuthLog = void 0;
const typeorm_1 = require("typeorm");
const UserAuth_1 = require("./UserAuth");
let UserAuthLog = class UserAuthLog {
};
exports.UserAuthLog = UserAuthLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserAuthLogId" }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "userAuthLogId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserAgent" }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "EventType",
        enum: [
            "EMAIL_VERIFICATION",
            "EMAIL_CHANGE",
            "EMAIL_UPDATE_VERIFICATION",
            "PHONE_VERIFICATION",
            "ACCOUNT_ACTIVATION",
            "ACCOUNT_DEACTIVATION",
            "ACCOUNT_REACTIVATION",
            "LOGIN_CONFIRMATION",
            "ACCOUNT_DELETION",
            "SOCIAL_LOGIN_LINK",
            "DEVICE_VERIFICATION",
            "LOGIN",
            "LOGOUT",
            "PASSWORD_RESET",
        ],
    }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "EventTime",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], UserAuthLog.prototype, "eventTime", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "IpAddress", nullable: true }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "AuthMethod",
        enum: [
            "PASSWORD",
            "PIN",
            "PASSWORDLESS",
            "OTP",
            "GOOGLE",
            "FACEBOOK",
            "APPLE",
            "GITHUB",
            "LINKEDIN",
            "SSO",
            "SAML",
            "OAUTH2",
            "OPENID_CONNECT",
            "AZURE_AD",
            "OKTA",
            "FINGERPRINT",
            "FACE_RECOGNITION",
            "VOICE_RECOGNITION",
            "2FA_SMS",
            "2FA_EMAIL",
            "2FA_AUTH_APP",
            "2FA_HARDWARE_TOKEN",
            "MAGIC_LINK",
            "TOKEN",
            "QR_CODE",
            "GUEST",
        ],
    }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "authMethod", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SessionId" }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "Status",
        enum: [
            "SUCCESS",
            "FAILED",
            "LOCKED",
            "ACTIONS",
            "PENDING",
            "EXPIRED",
            "TIMED_OUT",
            "REVOKED",
            "MFA_REQUIRED",
        ],
    }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "MfaMethod",
        nullable: true,
        enum: [
            "SMS",
            "EMAIL",
            "AUTH_APP",
            "HARDWARE_TOKEN",
            "PUSH_NOTIFICATION",
            "BIOMETRICS",
        ],
    }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "mfaMethod", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "MfaStatus",
        nullable: true,
        enum: [
            "SUCCESS",
            "FAILED",
            "SKIPPED",
            "TIMED_OUT",
            "PENDING",
            "NOT_REQUIRED",
        ],
    }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "mfaStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Geolocation", nullable: true }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "geolocation", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "FailedReason", nullable: true }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "failedReason", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "LoginAt", nullable: true }),
    __metadata("design:type", Date)
], UserAuthLog.prototype, "loginAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "LogOutAt", nullable: true }),
    __metadata("design:type", Date)
], UserAuthLog.prototype, "logOutAt", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AccessToken" }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "RefreshToken" }),
    __metadata("design:type", String)
], UserAuthLog.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.userAuthLogs),
    (0, typeorm_1.JoinColumn)([{ name: "UserAuthId", referencedColumnName: "userAuthId" }]),
    __metadata("design:type", UserAuth_1.UserAuth)
], UserAuthLog.prototype, "userAuth", void 0);
exports.UserAuthLog = UserAuthLog = __decorate([
    (0, typeorm_1.Index)("UserAuthLog_pkey", ["userAuthLogId"], { unique: true }),
    (0, typeorm_1.Entity)("UserAuthLog", { schema: "dbo" })
], UserAuthLog);
//# sourceMappingURL=UserAuthLog.js.map