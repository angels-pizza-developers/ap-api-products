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
exports.FacebookStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_method_constant_1 = require("../../../shared/constants/auth-method.constant");
const brand_constant_1 = require("../../../shared/constants/brand.constant");
const user_role_constant_1 = require("../../../shared/constants/user-role.constant");
const auth_service_1 = require("../service/auth.service");
const token_service_1 = require("../service/token.service");
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, "facebook") {
    constructor(authService, tokenService, configService) {
        super({
            clientID: configService.get("FACEBOOK_CLIENT_ID"),
            clientSecret: configService.get("FACEBOOK_CLIENT_SECRET"),
            callbackURL: configService.get("FACEBOOK_CALLBACK_URL"),
            profileFields: ["id", "emails", "name", "picture"],
            passReqToCallback: true,
        });
        this.authService = authService;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    async validate(req, accessToken, refreshToken, profile, done) {
        const { id } = profile;
        const { state } = req.query;
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
                userAuth = await this.authService.validateUserAuth(id, auth_method_constant_1.AUTH_METHOD.FACEBOOK);
                if (!userAuth || !userAuth.isVerified) {
                    userAuth = await this.authService.linkSocialAccount(userId, auth_method_constant_1.AUTH_METHOD.FACEBOOK, id);
                }
            }
            catch (err) {
                return done(null, false, false);
            }
        }
        else {
            userAuth = await this.authService.validateUserAuth(id, auth_method_constant_1.AUTH_METHOD.FACEBOOK);
            if (!userAuth) {
                return done(null, false, false);
            }
        }
        done(null, {
            userId: userAuth.user.userId,
            providerUserId: userAuth.providerUserId,
            authMethod: auth_method_constant_1.AUTH_METHOD.FACEBOOK,
            role: user_role_constant_1.USER_ROLE.CUSTOMER,
            brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
            sessionId: _sessionId,
            requestMetadata,
        });
    }
};
exports.FacebookStrategy = FacebookStrategy;
exports.FacebookStrategy = FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        token_service_1.TokenService,
        config_1.ConfigService])
], FacebookStrategy);
//# sourceMappingURL=facebook.strategy.js.map