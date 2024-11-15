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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_token_type_constant_1 = require("../../../shared/constants/auth-token-type.constant");
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    getSecret(tokenType) {
        if (tokenType === auth_token_type_constant_1.AUTH_TOKENT_TYPE.ACCESS) {
            return this.configService.get("JWT_ACCESS_TOKEN_SECRET");
        }
        else if (tokenType === auth_token_type_constant_1.AUTH_TOKENT_TYPE.REFRESH) {
            return this.configService.get("JWT_REFRESH_TOKEN_SECRET");
        }
        else if (tokenType === auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION) {
            return this.configService.get("JWT_VERIFICATION_TOKEN_SECRET");
        }
        else if (tokenType === auth_token_type_constant_1.AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN) {
            return this.configService.get("JWT_PERSONAL_ACCESS_TOKEN_SECRET");
        }
        else {
            return this.configService.get("JWT_SECRET");
        }
    }
    getTokenDecoded(token) {
        return this.jwtService.decode(token);
    }
    verifyAccessToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.ACCESS),
        });
    }
    verifyRefreshToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.REFRESH),
        });
    }
    verifyEmailVerificationToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION),
        });
    }
    verifySocialLoginToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.SOCIAL_LOGIN),
        });
    }
    verifySocialVerificationToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.SOCIAL_LOGIN),
        });
    }
    verifyPersonalAccessToken(token) {
        return this.jwtService.verify(token, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN),
        });
    }
    generateToken(payload, expiresIn) {
        const token = this.jwtService.sign(payload, {
            secret: this.getSecret(payload.tokenType),
            expiresIn,
        });
        const decoded = this.getTokenDecoded(token);
        return {
            token,
            decoded,
        };
    }
    generateStateToken(payload, expiresIn) {
        const token = this.jwtService.sign(payload, {
            secret: this.getSecret(auth_token_type_constant_1.AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN),
            expiresIn,
        });
        const decoded = this.getTokenDecoded(token);
        return {
            token,
            decoded,
        };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map