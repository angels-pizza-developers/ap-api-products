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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../user/service/user.service");
const typeorm_1 = require("typeorm");
const token_service_1 = require("./token.service");
const UserAuth_1 = require("../../../database/entities/UserAuth");
const typeorm_2 = require("@nestjs/typeorm");
const brand_constant_1 = require("../../../shared/constants/brand.constant");
const auth_method_constant_1 = require("../../../shared/constants/auth-method.constant");
const user_role_constant_1 = require("../../../shared/constants/user-role.constant");
const auth_error_constant_1 = require("../../../shared/constants/auth-error.constant");
const hash_utils_1 = require("../../../shared/utils/hash.utils");
const email_service_1 = require("../../../shared/services/email.service");
const UserAuthTokenLog_1 = require("../../../database/entities/UserAuthTokenLog");
const auth_token_type_constant_1 = require("../../../shared/constants/auth-token-type.constant");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const auth_token_status_constant_1 = require("../../../shared/constants/auth-token-status.constant");
const User_1 = require("../../../database/entities/User");
const UserAuthLog_1 = require("../../../database/entities/UserAuthLog");
const auth_event_type_constant_1 = require("../../../shared/constants/auth-event-type.constant");
const auth_status_constant_1 = require("../../../shared/constants/auth-status.constant");
const CustomerUser_1 = require("../../../database/entities/CustomerUser");
const BranchUser_1 = require("../../../database/entities/BranchUser");
const DriverUser_1 = require("../../../database/entities/DriverUser");
const customer_user_service_1 = require("../../customer-user/customer-user.service");
let AuthService = class AuthService {
    constructor(userAuthRepo, userService, customerUserService, emailService, connection, configService, tokenService) {
        this.userAuthRepo = userAuthRepo;
        this.userService = userService;
        this.customerUserService = customerUserService;
        this.emailService = emailService;
        this.connection = connection;
        this.configService = configService;
        this.tokenService = tokenService;
    }
    async generateStateToken(payload) {
        try {
            const { token } = this.tokenService.generateStateToken(payload, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"));
            return token;
        }
        catch (ex) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                error: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                message: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async generateAuthToken({ userId, authMethod, providerUserId, role, brand, sessionId }, requestMetadata, tokenType, expiresIn, data = {}, connection = this.connection) {
        return connection.manager.transaction(async (entityManager) => {
            if (!userId ||
                userId === "" ||
                !authMethod ||
                authMethod === "" ||
                !role ||
                role === "") {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    error: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                    message: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                    errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            const userAuth = await entityManager.findOne(UserAuth_1.UserAuth, {
                where: {
                    user: {
                        brand,
                        userId,
                        role,
                        active: true,
                    },
                    authMethod,
                    providerUserId,
                },
                relations: {
                    user: true,
                },
            });
            if (!userAuth) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    error: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                    message: auth_error_constant_1.AUTH_ERROR_INVALID_CREDENTIALS,
                    errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            const { token, decoded } = this.tokenService.generateToken({
                brand,
                userId,
                authMethod,
                providerUserId,
                role,
                tokenType,
                data,
                sessionId,
            }, expiresIn);
            if (token) {
                const userAuthTokenLog = new UserAuthTokenLog_1.UserAuthTokenLog();
                userAuthTokenLog.userAuth = userAuth;
                userAuthTokenLog.token = token;
                userAuthTokenLog.status = auth_token_status_constant_1.AUTH_TOKEN_STATUS.ACTIVE;
                userAuthTokenLog.tokenType = tokenType;
                userAuthTokenLog.issuedAt = moment_timezone_1.default
                    .unix(decoded?.iat)
                    .tz("UTC")
                    .toDate();
                userAuthTokenLog.expiresAt = moment_timezone_1.default
                    .unix(decoded?.exp)
                    .tz("UTC")
                    .toDate();
                userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
                userAuthTokenLog.userAgent = requestMetadata["user-agent"];
                userAuthTokenLog.geolocation = requestMetadata.geolocation;
                userAuthTokenLog.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                await entityManager.save(UserAuthTokenLog_1.UserAuthTokenLog, userAuthTokenLog);
            }
            return token;
        });
    }
    async registerCustomer(dto, requestMetadata) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const customerUser = await this.customerUserService.registerCustomer(dto, auth_method_constant_1.AUTH_METHOD.PASSWORD, entityManager.connection);
                const { token, decoded } = await this.tokenService.generateToken({
                    brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                    userId: customerUser.user?.userId,
                    authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
                    providerUserId: dto.email,
                    role: user_role_constant_1.USER_ROLE.CUSTOMER,
                    tokenType: auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION,
                    sessionId: requestMetadata["sessionId"],
                }, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"));
                if (token) {
                    const userAuth = customerUser.user.userAuths[0];
                    const userAuthTokenLog = new UserAuthTokenLog_1.UserAuthTokenLog();
                    userAuthTokenLog.userAuth = userAuth;
                    userAuthTokenLog.token = token;
                    userAuthTokenLog.status = auth_token_status_constant_1.AUTH_TOKEN_STATUS.PENDING_VERIFICATION;
                    userAuthTokenLog.tokenType = auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION;
                    userAuthTokenLog.issuedAt = moment_timezone_1.default
                        .unix(decoded?.iat)
                        .tz("UTC")
                        .toDate();
                    userAuthTokenLog.expiresAt = moment_timezone_1.default
                        .unix(decoded?.exp)
                        .tz("UTC")
                        .toDate();
                    userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
                    userAuthTokenLog.userAgent = requestMetadata["user-agent"];
                    userAuthTokenLog.geolocation = requestMetadata.geolocation;
                    userAuthTokenLog.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                    await entityManager.save(UserAuthTokenLog_1.UserAuthTokenLog, userAuthTokenLog);
                }
                await this.emailService.sendEmailVerification(dto.email, `${dto.firstName} ${dto.lastName}`, token, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"));
                return customerUser;
            }
            catch (ex) {
                if (ex["message"] &&
                    (ex["message"].includes("duplicate key") ||
                        ex["message"].includes("violates unique constraint")) &&
                    ex["message"].includes("user")) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: "This email is already registered",
                        message: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                        errorCode: "REGISTER_ERROR_EMAIL_USED",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                else if (ex["message"] &&
                    ex["message"].toLowerCase().includes("used") &&
                    ex["message"].toLowerCase().includes("email")) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: "This email is already registered",
                        message: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                        errorCode: "REGISTER_ERROR_EMAIL_USED",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    throw ex;
                }
            }
        });
    }
    async resendEmailVerification(providerUser, requestMetadata) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const userAuth = await entityManager.findOne(UserAuth_1.UserAuth, {
                    where: {
                        providerUserId: providerUser,
                        active: true,
                    },
                    relations: {
                        user: true,
                    },
                });
                if (!userAuth || !userAuth?.user) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                        message: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                        errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                let fullName;
                if (userAuth?.user.role === user_role_constant_1.USER_ROLE.CUSTOMER) {
                    const customer = await entityManager.findOne(CustomerUser_1.CustomerUser, {
                        where: {
                            user: {
                                userId: userAuth?.user?.userId,
                            },
                        },
                    });
                    if (!customer) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            message: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    fullName = `${customer.firstName} ${customer.lastName}`;
                }
                else if (userAuth?.user.role === user_role_constant_1.USER_ROLE.BRANCH) {
                    const branchUser = await entityManager.findOne(BranchUser_1.BranchUser, {
                        where: {
                            user: {
                                userId: userAuth?.user?.userId,
                            },
                        },
                    });
                    if (!branchUser) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            message: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    fullName = branchUser.name;
                }
                else if (userAuth?.user.role === user_role_constant_1.USER_ROLE.DRIVER) {
                    const driverUser = await entityManager.findOne(DriverUser_1.DriverUser, {
                        where: {
                            user: {
                                userId: userAuth?.user?.userId,
                            },
                        },
                    });
                    if (!driverUser) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            message: auth_error_constant_1.VERIFICATION_ERROR_INVALID_EMAIL,
                            errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    fullName = driverUser.name;
                }
                const { token, decoded } = await this.tokenService.generateToken({
                    brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                    userId: userAuth.user?.userId,
                    authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
                    providerUserId: providerUser,
                    role: userAuth?.user.role,
                    tokenType: auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION,
                    sessionId: requestMetadata["sessionId"],
                }, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"));
                if (token) {
                    const userAuthTokenLog = new UserAuthTokenLog_1.UserAuthTokenLog();
                    userAuthTokenLog.userAuth = userAuth;
                    userAuthTokenLog.token = token;
                    userAuthTokenLog.status = auth_token_status_constant_1.AUTH_TOKEN_STATUS.PENDING_VERIFICATION;
                    userAuthTokenLog.tokenType = auth_token_type_constant_1.AUTH_TOKENT_TYPE.EMAIL_VERIFICATION;
                    userAuthTokenLog.issuedAt = moment_timezone_1.default
                        .unix(decoded?.iat)
                        .tz("UTC")
                        .toDate();
                    userAuthTokenLog.expiresAt = moment_timezone_1.default
                        .unix(decoded?.exp)
                        .tz("UTC")
                        .toDate();
                    userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
                    userAuthTokenLog.userAgent = requestMetadata["user-agent"];
                    userAuthTokenLog.geolocation = requestMetadata.geolocation;
                    userAuthTokenLog.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                    await entityManager.save(UserAuthTokenLog_1.UserAuthTokenLog, userAuthTokenLog);
                }
                await this.emailService.sendEmailVerification(providerUser, fullName, token, this.configService.get("AUTH_VERIFY_TOKEN_EXPIRE"));
                return providerUser;
            }
            catch (ex) {
                throw ex;
            }
        });
    }
    async linkSocialAccount(userId, authMethod, providerUserId) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const user = await entityManager.findOneBy(User_1.User, { userId });
                let userAuth = await entityManager.findOneBy(UserAuth_1.UserAuth, {
                    user: { userId },
                    authMethod,
                    providerUserId,
                });
                if (!userAuth) {
                    userAuth = new UserAuth_1.UserAuth();
                    userAuth.user = user;
                    userAuth.authMethod = authMethod;
                    userAuth.providerUserId = providerUserId;
                    userAuth.isVerified = true;
                }
                else {
                    userAuth.isVerified = true;
                }
                userAuth = await entityManager.save(UserAuth_1.UserAuth, userAuth);
                return userAuth;
            }
            catch (ex) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: auth_error_constant_1.LINK_SOCIAL_ERROR,
                    message: auth_error_constant_1.LINK_SOCIAL_ERROR,
                    errorCode: "LINK_SOCIAL_ERROR",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async validateUserCredentials({ email, password }, requestMetadata) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            const userAuth = await entityManager.findOne(UserAuth_1.UserAuth, {
                where: {
                    authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
                    providerUserId: email,
                    user: {
                        role: requestMetadata.role,
                        brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                    },
                },
                relations: {
                    user: true,
                },
            });
            if (!userAuth) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: auth_error_constant_1.LOGIN_ERROR_EMAIL_NOT_FOUND,
                    message: auth_error_constant_1.LOGIN_ERROR_EMAIL_NOT_FOUND,
                    errorCode: "LOGIN_ERROR_EMAIL_NOT_FOUND",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!userAuth.isVerified) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: auth_error_constant_1.LOGIN_ERROR_NOT_VERIFIED,
                    message: auth_error_constant_1.LOGIN_ERROR_NOT_VERIFIED,
                    errorCode: "LOGIN_ERROR_NOT_VERIFIED",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const passwordMatch = await (0, hash_utils_1.compare)(userAuth.passwordHash, password);
            if (!passwordMatch) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT,
                    message: auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT,
                    errorCode: "LOGIN_ERROR_PASSWORD_INCORRECT",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const accessToken = await this.generateAuthToken({
                brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                userId: userAuth.user.userId,
                authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
                providerUserId: email,
                role: requestMetadata.role,
                sessionId: requestMetadata["sessionId"] ?? "",
            }, {}, auth_token_type_constant_1.AUTH_TOKENT_TYPE.ACCESS, this.configService.get("AUTH_ACCESS_TOKEN_EXPIRE"), {}, entityManager.connection);
            const refreshToken = await this.generateAuthToken({
                brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                userId: userAuth.user.userId,
                authMethod: auth_method_constant_1.AUTH_METHOD.PASSWORD,
                providerUserId: email,
                role: requestMetadata.role,
                sessionId: requestMetadata["sessionId"] ?? "",
            }, {}, auth_token_type_constant_1.AUTH_TOKENT_TYPE.REFRESH, this.configService.get("AUTH_REFRESH_TOKEN_EXPIRE"), {}, entityManager.connection);
            await this.generateUserAuthLog(userAuth.userAuthId, requestMetadata["user-agent"] ?? "", auth_event_type_constant_1.AUTH_EVENT_TYPE.LOGIN, auth_method_constant_1.AUTH_METHOD.PASSWORD, requestMetadata["sessionId"] ?? "", auth_status_constant_1.AUTH_STATUS.SUCCESS, accessToken, refreshToken, brand_constant_1.BRAND_TYPE.ANGELS_PIZZA, entityManager.connection);
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    async confirmSocialLogin({ userId, providerUserId, authMethod, role, sessionId }, newAuthMethod, requestMetadata) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const userAuth = await entityManager.findOneBy(UserAuth_1.UserAuth, {
                    user: { userId },
                    authMethod,
                    providerUserId,
                });
                if (!userAuth) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.UNAUTHORIZED,
                        error: auth_error_constant_1.LOGIN_ERROR_SOCIAL_SERVICE_ERROR,
                        message: auth_error_constant_1.LOGIN_ERROR_SOCIAL_SERVICE_ERROR,
                        errorCode: "LOGIN_ERROR_SOCIAL_SERVICE_ERROR",
                    }, common_1.HttpStatus.UNAUTHORIZED);
                }
                const accessToken = await this.generateAuthToken({
                    userId,
                    providerUserId,
                    authMethod: newAuthMethod,
                    role,
                    sessionId: sessionId ?? "",
                    brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                }, requestMetadata ?? {}, auth_token_type_constant_1.AUTH_TOKENT_TYPE.ACCESS, this.configService.get("AUTH_ACCESS_TOKEN_EXPIRE"), {}, entityManager.connection);
                const refreshToken = await this.generateAuthToken({
                    userId,
                    providerUserId,
                    authMethod: newAuthMethod,
                    role,
                    sessionId: sessionId ?? "",
                    brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                }, requestMetadata, auth_token_type_constant_1.AUTH_TOKENT_TYPE.REFRESH, this.configService.get("AUTH_REFRESH_TOKEN_EXPIRE"), {}, entityManager.connection);
                await this.generateUserAuthLog(userAuth.userAuthId, requestMetadata["user-agent"] ?? "", auth_event_type_constant_1.AUTH_EVENT_TYPE.LOGIN, newAuthMethod, requestMetadata["sessionId"] ?? "", auth_status_constant_1.AUTH_STATUS.SUCCESS, accessToken, refreshToken, brand_constant_1.BRAND_TYPE.ANGELS_PIZZA, entityManager.connection);
                return { accessToken, refreshToken };
            }
            catch (ex) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Unauthorized",
                    message: auth_error_constant_1.AUTH_ERROR_REQUEST_ERROR,
                    errorCode: "AUTH_ERROR_REQUEST_ERROR",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async validateUserAuth(providerUserId, authMethod) {
        const userAuth = await this.userAuthRepo.findOne({
            where: {
                authMethod,
                providerUserId,
                user: {
                    brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                    active: true,
                },
            },
            relations: {
                user: true,
            },
        });
        return userAuth;
    }
    async generateUserAuthLog(userAuthId, userAgent, eventType, authMethod, sessionId, status, accessToken, refreshToken, brand, connection = this.connection) {
        return connection.manager.transaction(async (entityManager) => {
            try {
                const userAuth = await entityManager.findOneBy(UserAuth_1.UserAuth, {
                    userAuthId,
                });
                const userAuthLog = new UserAuthLog_1.UserAuthLog();
                userAuthLog.userAuth = userAuth;
                userAuthLog.userAgent = userAgent;
                userAuthLog.eventType = eventType;
                userAuthLog.authMethod = authMethod;
                userAuthLog.sessionId = sessionId;
                userAuthLog.status = status;
                userAuthLog.accessToken = accessToken;
                userAuthLog.refreshToken = refreshToken;
                userAuthLog.brand = brand;
                return await entityManager.save(UserAuthLog_1.UserAuthLog, userAuthLog);
            }
            catch (ex) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Unauthorized",
                    message: auth_error_constant_1.AUTH_ERROR_REQUEST_ERROR,
                    errorCode: "AUTH_ERROR_REQUEST_ERROR",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async validateVerificationToken(token) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const { brand, userId, authMethod, providerUserId, role } = this.tokenService.verifyEmailVerificationToken(token);
                const userAuthTokenLog = await entityManager.findOne(UserAuthTokenLog_1.UserAuthTokenLog, {
                    where: { token },
                });
                if (!userAuthTokenLog) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: "Unauthorized",
                        message: auth_error_constant_1.VERIFICATION_ERROR_FAILED_INVALID,
                        errorCode: "VERIFICATION_ERROR_FAILED_INVALID",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (userAuthTokenLog.status === auth_token_status_constant_1.AUTH_TOKEN_STATUS.VERIFIED) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: "Unauthorized",
                        message: auth_error_constant_1.VERIFICATION_ERROR_FAILED_USED,
                        errorCode: "VERIFICATION_ERROR_FAILED_USED",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                userAuthTokenLog.status = auth_token_status_constant_1.AUTH_TOKEN_STATUS.VERIFIED;
                await entityManager.save(UserAuthTokenLog_1.UserAuthTokenLog, userAuthTokenLog);
                let userAuth = await this.userAuthRepo.findOne({
                    where: {
                        user: {
                            brand,
                            userId,
                            role,
                            active: true,
                        },
                        authMethod,
                        providerUserId,
                    },
                    relations: {
                        user: true,
                    },
                });
                if (!userAuth) {
                    throw new common_1.UnauthorizedException();
                }
                userAuth.isVerified = true;
                userAuth = await entityManager.save(UserAuth_1.UserAuth, userAuth);
                userAuth.user.isVerified = true;
                await entityManager.save(User_1.User, userAuth.user);
                return true;
            }
            catch (e) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Unauthorized",
                    message: auth_error_constant_1.VERIFICATION_ERROR_FAILED,
                    errorCode: "VERIFICATION_ERROR_FAILED",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async logOut(userId, sessionId) {
        this.userAuthRepo.manager.transaction(async (entityManager) => {
            try {
                const userAuthLog = await entityManager.findOne(UserAuthLog_1.UserAuthLog, {
                    where: {
                        userAuth: {
                            user: {
                                userId,
                            },
                        },
                        sessionId,
                    },
                    relations: {
                        userAuth: {
                            user: true,
                        },
                    },
                });
                if (userAuthLog) {
                    userAuthLog.status = auth_status_constant_1.AUTH_STATUS.EXPIRED;
                    userAuthLog.logOutAt = moment_timezone_1.default.tz("utc").toDate();
                    await entityManager.save(UserAuthLog_1.UserAuthLog, userAuthLog);
                }
            }
            catch (e) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Unauthorized",
                    message: auth_error_constant_1.VERIFICATION_ERROR_FAILED,
                    errorCode: "VERIFICATION_ERROR_FAILED",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async refreshToken(oldRefreshToken, userId, sessionId) {
        return this.userAuthRepo.manager.transaction(async (entityManager) => {
            const userAuthLog = await entityManager.findOne(UserAuthLog_1.UserAuthLog, {
                where: {
                    userAuth: {
                        user: {
                            userId,
                        },
                    },
                    sessionId,
                },
                relations: {
                    userAuth: {
                        user: true,
                    },
                },
            });
            if (!userAuthLog ||
                !userAuthLog?.userAuth ||
                !userAuthLog?.userAuth?.user) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Invalid refresh token",
                    message: auth_error_constant_1.REFRESH_ERROR_INVALID_TOKEN,
                    errorCode: "REFRESH_ERROR_INVALID_TOKEN",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const valid = await (0, hash_utils_1.compare)(oldRefreshToken, userAuthLog.refreshToken);
            if (!valid) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: "Invalid refresh token",
                    message: auth_error_constant_1.REFRESH_ERROR_INVALID_TOKEN,
                    errorCode: "REFRESH_ERROR_INVALID_TOKEN",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const accessToken = await this.generateAuthToken({
                brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                userId: userAuthLog?.userAuth?.user?.userId,
                authMethod: userAuthLog?.userAuth?.authMethod,
                providerUserId: userAuthLog?.userAuth?.providerUserId,
                role: userAuthLog?.userAuth?.user?.role,
                sessionId,
            }, {}, auth_token_type_constant_1.AUTH_TOKENT_TYPE.ACCESS, this.configService.get("AUTH_ACCESS_TOKEN_EXPIRE"), {}, entityManager.connection);
            const refreshToken = await this.generateAuthToken({
                brand: brand_constant_1.BRAND_TYPE.ANGELS_PIZZA,
                userId: userAuthLog?.userAuth?.user?.userId,
                authMethod: userAuthLog?.userAuth?.authMethod,
                providerUserId: userAuthLog?.userAuth?.providerUserId,
                role: userAuthLog?.userAuth?.user?.role,
                sessionId,
            }, {}, auth_token_type_constant_1.AUTH_TOKENT_TYPE.REFRESH, this.configService.get("AUTH_REFRESH_TOKEN_EXPIRE"), {}, entityManager.connection);
            return { accessToken, refreshToken };
        });
    }
    async getProfile(userId) {
        return this.userService.getProfile(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(UserAuth_1.UserAuth)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService,
        customer_user_service_1.CustomerUserService,
        email_service_1.EmailService,
        typeorm_1.Connection,
        config_1.ConfigService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map