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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const facebook_auth_guard_1 = require("../../common/guards/facebook-auth.guard");
const google_auth_guard_1 = require("../../common/guards/google-auth.guard");
const auth_service_1 = require("./service/auth.service");
const config_1 = require("@nestjs/config");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const request_metadata_decorator_1 = require("../../common/decorators/request-metadata.decorator");
const request_metadata_model_1 = require("../../common/models/request-metadata.model");
const request_metadata_factory_1 = require("../../common/factory/request-metadata.factory");
const passport_1 = require("@nestjs/passport");
const auth_token_type_constant_1 = require("../../shared/constants/auth-token-type.constant");
const auth_error_constant_1 = require("../../shared/constants/auth-error.constant");
const auth_method_constant_1 = require("../../shared/constants/auth-method.constant");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async getUserProfile(req, _res) {
        const res = {};
        try {
            if (!req.user || !req.user?.userId) {
                return _res
                    .status(common_1.HttpStatus.UNAUTHORIZED)
                    .json({ message: "Invalid access token" });
            }
            res.data = await this.authService.getProfile(req.user?.userId);
            res.success = true;
            return _res.status(common_1.HttpStatus.OK).json(res);
        }
        catch (ex) {
            throw ex;
        }
    }
    async linkGoogle(res, req, requestMetadata) {
        const linkingToken = await this.authService.generateAuthToken(req.user, requestMetadata, auth_token_type_constant_1.AUTH_TOKENT_TYPE.SOCIAL_LOGIN, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"), requestMetadata);
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.configService.get("GOOGLE_CLIENT_ID")}&redirect_uri=http://localhost:3000/auth/google/callback&response_type=code&scope=openid%20profile%20email&state=${linkingToken}`;
        return res.redirect(googleAuthUrl);
    }
    async googleLogin() {
    }
    async googleLoginCallback(req, res, requestMetadata) {
        if (!req.user) {
            console.log(req.authInfo);
            res.location(`${this.configService.get("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=google`);
            res.redirect(`${this.configService.get("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=google`);
        }
        else {
            const { accessToken, refreshToken } = await this.authService.confirmSocialLogin(req.user, auth_method_constant_1.AUTH_METHOD.GOOGLE, {
                ...requestMetadata,
                ...req.user.requestMetadata,
                ...req.query,
            });
            res.location(`${this.configService.get("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`);
            res.redirect(`${this.configService.get("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        }
    }
    async linkFacebook(res, req, requestMetadata) {
        const linkingToken = await this.authService.generateAuthToken(req.user, requestMetadata, auth_token_type_constant_1.AUTH_TOKENT_TYPE.SOCIAL_LOGIN, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"), requestMetadata);
        const facebookAuthUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${this.configService.get("FACEBOOK_CLIENT_ID")}&redirect_uri=http://localhost:3000/auth/facebook/callback&state=${linkingToken}`;
        return res.redirect(facebookAuthUrl);
    }
    async facebookLogin() {
    }
    async facebookLoginCallback(req, res, requestMetadata) {
        if (!req.user) {
            console.log(req.authInfo);
            res.location(`${this.configService.get("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=facebook`);
            res.redirect(`${this.configService.get("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=facebook`);
        }
        else {
            const { accessToken, refreshToken } = await this.authService.confirmSocialLogin(req.user, auth_method_constant_1.AUTH_METHOD.FACEBOOK, {
                ...requestMetadata,
                ...req.user.requestMetadata,
                ...req.query,
            });
            res.location(`${this.configService.get("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`);
            res.redirect(`${this.configService.get("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        }
    }
    async login(requestMetadata, dto) {
        try {
            return await this.authService.validateUserCredentials(dto, requestMetadata);
        }
        catch (ex) {
            throw ex;
        }
    }
    async registerCustomer(requestMetadata, dto) {
        return await this.authService.registerCustomer(dto, requestMetadata);
    }
    async verifyEmail(req, res) {
        try {
            const { token } = req.body;
            const isValid = await this.authService.validateVerificationToken(token);
            if (isValid) {
                return await this.authService.validateVerificationToken(token);
            }
            else {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Unauthorized",
                    message: auth_error_constant_1.VERIFICATION_ERROR_FAILED_INVALID,
                    errorCode: "VERIFICATION_ERROR_FAILED_INVALID",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async resendEmailVerification(req, _res, requestMetadata) {
        const res = {};
        const { providerUser } = req.body;
        try {
            res.data = await this.authService.resendEmailVerification(providerUser, requestMetadata);
            res.success = true;
            return _res.status(common_1.HttpStatus.OK).json(res);
        }
        catch (ex) {
            throw ex;
        }
    }
    async refreshToken(req, _res) {
        const res = {};
        let refreshToken = req.cookies["refreshToken"];
        const { userId, sessionId } = req.body;
        if (!refreshToken) {
            refreshToken = req.body.refreshToken;
        }
        if (!refreshToken) {
            return _res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: "No refresh token" });
        }
        try {
            res.data = await this.authService.refreshToken(refreshToken, userId, sessionId);
            _res.cookie("refreshToken", res.data.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.success = true;
            return res;
        }
        catch (ex) {
            res.success = false;
            res.message = ex.message !== undefined ? ex.message : ex;
            return _res.status(common_1.HttpStatus.FORBIDDEN).json(res);
        }
    }
    async logout(req, res) {
        const { userId, sessionId } = req.body;
        try {
            await this.authService.logOut(userId, sessionId);
            res.clearCookie("refreshToken");
            return res
                .status(common_1.HttpStatus.OK)
                .json({ message: "Logged out successfully" });
        }
        catch (ex) {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: "Invalid refresh token" });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)("link/google"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation", "sessionid")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "sessionId",
        description: "SessionId of the client making the request. ex: Device UUID",
        required: true,
    }),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, request_metadata_decorator_1.RequestMetadata)(["timezone", "user-agent", "geolocation", "sessionId"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_metadata_model_1.RequestMetadataModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkGoogle", null);
__decorate([
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, request_metadata_decorator_1.RequestMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_metadata_model_1.RequestMetadataModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    (0, common_1.Get)("link/facebook"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation", "sessionid")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "sessionId",
        description: "SessionId of the client making the request. ex: Device UUID",
        required: true,
    }),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, request_metadata_decorator_1.RequestMetadata)(["timezone", "user-agent", "geolocation", "sessionId"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_metadata_model_1.RequestMetadataModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkFacebook", null);
__decorate([
    (0, common_1.Get)("facebook"),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLogin", null);
__decorate([
    (0, common_1.Get)("facebook/callback"),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, request_metadata_decorator_1.RequestMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_metadata_model_1.RequestMetadataModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLoginCallback", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation", "role", "sessionId")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "role",
        description: "Role of the client making the request. ex: CUSTOMER",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "sessionId",
        description: "SessionId of the client making the request. ex: Device UUID",
        required: true,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, request_metadata_decorator_1.RequestMetadata)([
        "timezone",
        "user-agent",
        "geolocation",
        "role",
        "sessionId",
    ])),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_metadata_model_1.RequestMetadataModel,
        login_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register_customer"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "sessionId",
        description: "SessionId of the client making the request. ex: Device UUID",
        required: true,
    }),
    openapi.ApiResponse({ status: 201, type: require("../../database/entities/CustomerUser").CustomerUser }),
    __param(0, (0, request_metadata_decorator_1.RequestMetadata)(["timezone", "user-agent", "geolocation"])),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_metadata_model_1.RequestMetadataModel,
        register_dto_1.RegisterCustomerUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.Post)("verify_email"),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)("resend_email_verification"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "sessionId",
        description: "SessionId of the client making the request. ex: Device UUID",
        required: true,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, request_metadata_decorator_1.RequestMetadata)(["timezone", "user-agent", "geolocation", "sessionId"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, request_metadata_model_1.RequestMetadataModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmailVerification", null);
__decorate([
    (0, common_1.Post)("refresh_token"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)((0, request_metadata_factory_1.RequestMetadataGuardFactory)("timezone", "user-agent", "geolocation")),
    (0, swagger_1.ApiHeader)({
        name: "timezone",
        description: "Timezone of the client making the request. ex: Asia/Manila",
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: "geolocation",
        description: "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
        required: true,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map