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
exports.UserAuth = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const UserAuthLog_1 = require("./UserAuthLog");
const UserAuthTokenLog_1 = require("./UserAuthTokenLog");
let UserAuth = class UserAuth {
};
exports.UserAuth = UserAuth;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserAuthId" }),
    __metadata("design:type", String)
], UserAuth.prototype, "userAuthId", void 0);
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
], UserAuth.prototype, "authMethod", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ProviderUserId", nullable: true }),
    __metadata("design:type", String)
], UserAuth.prototype, "providerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "PasswordHash", nullable: true }),
    __metadata("design:type", String)
], UserAuth.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsVerified", default: () => "false" }),
    __metadata("design:type", Boolean)
], UserAuth.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], UserAuth.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedAt", nullable: true }),
    __metadata("design:type", Date)
], UserAuth.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], UserAuth.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.userAuths),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], UserAuth.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAuthLog_1.UserAuthLog, (userAuthLog) => userAuthLog.userAuth),
    __metadata("design:type", Array)
], UserAuth.prototype, "userAuthLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAuthTokenLog_1.UserAuthTokenLog, (userAuthTokenLog) => userAuthTokenLog.userAuth),
    __metadata("design:type", Array)
], UserAuth.prototype, "userAuthTokenLogs", void 0);
exports.UserAuth = UserAuth = __decorate([
    (0, typeorm_1.Index)("UserAuth_pkey", ["userAuthId"], { unique: true }),
    (0, typeorm_1.Entity)("UserAuth", { schema: "dbo" })
], UserAuth);
//# sourceMappingURL=UserAuth.js.map