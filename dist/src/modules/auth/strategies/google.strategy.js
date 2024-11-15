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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const brand_constant_1 = require("../../../shared/constants/brand.constant");
const auth_method_constant_1 = require("../../../shared/constants/auth-method.constant");
const user_role_constant_1 = require("../../../shared/constants/user-role.constant");
const auth_service_1 = require("../service/auth.service");
const token_service_1 = require("../service/token.service");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "google") {
    constructor(authService, tokenService, configService) {
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
            callbackURL: configService.get("GOOGLE_CALLBACK_URL"),
            passReqToCallback: true,
            scope: ["email", "profile"],
        });
        this.authService = authService;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    async validate(req, accessToken, refreshToken, profile, done) {
        const { state } = req.query;
        const { emails } = profile;
        const email = emails[0].value;
        let userAuth, requestMetadata, _sessionId;
        if (state) {
            try {
                const { providerUserId, data, userId, role, sessionId } = this.tokenService.verifySocialVerificationToken(state);
                requestMetadata = data;
                _sessionId = sessionId;
                userAuth = await this.authService.validateUserAuth(providerUserId, auth_method_constant_1.AUTH_METHOD.PASSWORD);
                if (!userAuth) {
                    return done(null, false, false);
                }
                userAuth = await this.authService.validateUserAuth(email, auth_method_constant_1.AUTH_METHOD.GOOGLE);
                if (!userAuth || !userAuth.isVerified) {
                    userAuth = await this.authService.linkSocialAccount(userId, auth_method_constant_1.AUTH_METHOD.GOOGLE, email);
                }
            }
            catch (ex) {
                return done(null, false, false);
            }
        }
        else {
            userAuth = await this.authService.validateUserAuth(email, auth_method_constant_1.AUTH_METHOD.GOOGLE);
            if (!userAuth) {
                return done(null, false, false);
            }
        }
        done(null, {
            userId: userAuth.user.userId,
            providerUserId: userAuth.providerUserId,
            authMethod: auth_method_constant_1.AUTH_METHOD.GOOGLE,
            role: user_role_constant_1.USER_ROLE.CUSTOMER,
            sessionId: _sessionId,
            brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
            requestMetadata,
        });
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        token_service_1.TokenService,
        config_1.ConfigService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map