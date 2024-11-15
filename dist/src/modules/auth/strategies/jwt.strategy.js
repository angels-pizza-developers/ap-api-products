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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../service/auth.service");
const auth_method_constant_1 = require("../../../shared/constants/auth-method.constant");
const brand_constant_1 = require("../../../shared/constants/brand.constant");
const user_role_constant_1 = require("../../../shared/constants/user-role.constant");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        });
        this.authService = authService;
        this.configService = configService;
    }
    async validate({ userId, providerUserId, sessionId, exp }) {
        if (!exp) {
            throw new common_1.UnauthorizedException("Token does not have an expiration date");
        }
        if (!userId || !providerUserId) {
            throw new common_1.UnauthorizedException();
        }
        const userAuth = await this.authService.validateUserAuth(providerUserId, auth_method_constant_1.AUTH_METHOD.PASSWORD);
        if (!userAuth) {
            throw new common_1.UnauthorizedException();
        }
        return {
            userId: userAuth.user.userId,
            providerUserId: userAuth.providerUserId,
            authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
            role: user_role_constant_1.USER_ROLE.CUSTOMER,
            brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
            sessionId: sessionId,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map