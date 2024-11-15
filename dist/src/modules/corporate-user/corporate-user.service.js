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
exports.CorporateUserService = void 0;
const common_1 = require("@nestjs/common");
const corporate_user_repository_1 = require("../../database/repositories/corporate-user.repository");
const database_utils_1 = require("../../shared/utils/database.utils");
const CorporateUser_1 = require("../../database/entities/CorporateUser");
const User_1 = require("../../database/entities/User");
const UserAuth_1 = require("../../database/entities/UserAuth");
const auth_error_constant_1 = require("../../shared/constants/auth-error.constant");
const brand_constant_1 = require("../../shared/constants/brand.constant");
const user_role_constant_1 = require("../../shared/constants/user-role.constant");
const auth_method_constant_1 = require("../../shared/constants/auth-method.constant");
const hash_utils_1 = require("../../shared/utils/hash.utils");
const Access_1 = require("../../database/entities/Access");
let CorporateUserService = class CorporateUserService {
    constructor(corporateUserRepository) {
        this.corporateUserRepository = corporateUserRepository;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, database_utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.corporateUserRepository.find({
                where: {
                    ...condition,
                    active: true,
                },
                relations: {
                    user: {
                        access: true
                    },
                },
                skip,
                take,
                order,
            }),
            this.corporateUserRepository.count({
                where: {
                    ...condition,
                    active: true,
                },
            }),
        ]);
        return {
            results,
            total,
        };
    }
    async create(dto) {
        try {
            return this.corporateUserRepository.manager.transaction(async (entityManager) => {
                try {
                    let userAuth = await entityManager.findOne(UserAuth_1.UserAuth, {
                        where: {
                            providerUserId: dto.email,
                            active: true,
                            user: {
                                active: true,
                            },
                        },
                        relations: {
                            user: true,
                        },
                    });
                    if (userAuth) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                            message: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                            errorCode: "REGISTER_ERROR_EMAIL_USED",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    let user = new User_1.User();
                    user.role = user_role_constant_1.USER_ROLE.CORPORATE;
                    user.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                    user.isVerified = true;
                    const access = await entityManager.findOne(Access_1.Access, {
                        where: {
                            accessId: dto.accessId
                        }
                    });
                    if (!access) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.NOT_FOUND,
                            message: "Access not found",
                        }, common_1.HttpStatus.NOT_FOUND);
                    }
                    user.access = access;
                    user = await entityManager.save(User_1.User, user);
                    userAuth = new UserAuth_1.UserAuth();
                    userAuth.user = user;
                    userAuth.authMethod = auth_method_constant_1.AUTH_METHOD.PASSWORD;
                    userAuth.providerUserId = dto.email;
                    userAuth.isVerified = true;
                    userAuth.passwordHash = await (0, hash_utils_1.hash)(dto.password);
                    userAuth = await entityManager.save(UserAuth_1.UserAuth, userAuth);
                    let corporateUser = await entityManager.findOne(CorporateUser_1.CorporateUser, {
                        where: [
                            {
                                email: dto.email,
                                active: true,
                            },
                            {
                                mobileNumber: dto.mobileNumber,
                                active: true,
                            },
                        ],
                        relations: {
                            user: true,
                        },
                    });
                    if (corporateUser) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                            message: "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                            errorCode: "REGISTER_ERROR_EMAIL_USED",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    corporateUser = new CorporateUser_1.CorporateUser();
                    corporateUser.name = dto.name;
                    corporateUser.email = dto.email;
                    corporateUser.mobileNumber = dto.mobileNumber;
                    corporateUser.user = user;
                    corporateUser.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                    corporateUser = await entityManager.save(corporateUser);
                    if (!corporateUser) {
                        throw new Error("Error saving access type");
                    }
                    corporateUser = await entityManager.findOne(CorporateUser_1.CorporateUser, {
                        where: {
                            corporateUserId: corporateUser?.corporateUserId,
                            active: true,
                        },
                        relations: {
                            user: {
                                access: true,
                            },
                        },
                    });
                    return corporateUser;
                }
                catch (ex) {
                    console.log(ex.message);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: ex.message?.includes("duplicate") &&
                            ex.message?.includes("unique")
                            ? "Already exist!"
                            : ex?.message,
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async findOne(id) {
        const corporateUser = await this.corporateUserRepository.findOne({
            where: {
                corporateUserId: id,
                active: true,
            },
            relations: {
                user: {
                    access: true,
                },
            },
        });
        if (!corporateUser) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Not found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return corporateUser;
    }
    async update(id, dto) {
        return this.corporateUserRepository.manager.transaction(async (entityManager) => {
            try {
                let corporateUser = await entityManager.findOne(CorporateUser_1.CorporateUser, {
                    where: {
                        corporateUserId: id,
                        active: true,
                    },
                });
                if (!corporateUser) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: "Not found",
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                corporateUser.name = dto.name;
                corporateUser.email = dto.email;
                corporateUser.mobileNumber = dto.mobileNumber;
                corporateUser = await entityManager.save(CorporateUser_1.CorporateUser, corporateUser);
                corporateUser = await entityManager.findOne(CorporateUser_1.CorporateUser, {
                    where: {
                        corporateUserId: corporateUser?.corporateUserId,
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true,
                        },
                    },
                });
                let user = corporateUser.user;
                const access = await entityManager.findOne(Access_1.Access, {
                    where: {
                        accessId: dto.accessId
                    }
                });
                if (!access) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: "Access not found",
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                user.access = access;
                user = await entityManager.save(User_1.User, user);
                corporateUser.user = user;
                return corporateUser;
            }
            catch (ex) {
                console.log(ex.message);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ex.message?.includes("duplicate") &&
                        ex.message?.includes("unique")
                        ? "Already exist!"
                        : ex?.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    async remove(id) {
        try {
            const corporateUser = await this.corporateUserRepository.findOne({
                where: {
                    corporateUserId: id,
                    active: true,
                },
                relations: {
                    user: {
                        access: true
                    },
                },
            });
            if (!corporateUser) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            corporateUser.active = false;
            return await this.corporateUserRepository.save(corporateUser);
        }
        catch (ex) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ex.message?.includes("duplicate")
                    ? "Already exist!"
                    : ex?.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CorporateUserService = CorporateUserService;
exports.CorporateUserService = CorporateUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [corporate_user_repository_1.CorporateUserRepository])
], CorporateUserService);
//# sourceMappingURL=corporate-user.service.js.map