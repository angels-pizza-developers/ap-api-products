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
exports.BranchUserService = void 0;
const common_1 = require("@nestjs/common");
const BranchUser_1 = require("../../database/entities/BranchUser");
const User_1 = require("../../database/entities/User");
const UserAuth_1 = require("../../database/entities/UserAuth");
const branch_user_repository_1 = require("../../database/repositories/branch-user.repository");
const auth_error_constant_1 = require("../../shared/constants/auth-error.constant");
const auth_method_constant_1 = require("../../shared/constants/auth-method.constant");
const brand_constant_1 = require("../../shared/constants/brand.constant");
const user_role_constant_1 = require("../../shared/constants/user-role.constant");
const database_utils_1 = require("../../shared/utils/database.utils");
const hash_utils_1 = require("../../shared/utils/hash.utils");
const Branch_1 = require("../../database/entities/Branch");
const Access_1 = require("../../database/entities/Access");
let BranchUserService = class BranchUserService {
    constructor(branchUserRepository) {
        this.branchUserRepository = branchUserRepository;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, database_utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.branchUserRepository.find({
                where: {
                    ...condition,
                    active: true,
                },
                relations: {
                    user: {
                        access: true
                    },
                    branch: true,
                },
                skip,
                take,
                order,
            }),
            this.branchUserRepository.count({
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
            return this.branchUserRepository.manager.transaction(async (entityManager) => {
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
                            user: {
                                access: true
                            },
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
                    let branchUser = await entityManager.findOne(BranchUser_1.BranchUser, {
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
                            user: {
                                access: true
                            },
                        },
                    });
                    if (branchUser) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            error: "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                            message: "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                            errorCode: "REGISTER_ERROR_EMAIL_USED",
                        }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    const branch = await entityManager.findOne(Branch_1.Branch, {
                        where: {
                            branchId: dto.branchId,
                            active: true,
                        },
                    });
                    if (!branch) {
                        throw new Error(`Branch Id: ${dto.branchId} not found!`);
                    }
                    branchUser = new BranchUser_1.BranchUser();
                    branchUser.name = dto.name;
                    branchUser.email = dto.email;
                    branchUser.mobileNumber = dto.mobileNumber;
                    branchUser.user = user;
                    branchUser.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                    branchUser.branch = branch;
                    branchUser = await entityManager.save(branchUser);
                    if (!branchUser) {
                        throw new Error("Error saving access type");
                    }
                    return branchUser;
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
        const branchUser = await this.branchUserRepository.findOne({
            where: {
                branchUserId: id,
                active: true,
            },
            relations: {
                user: {
                    access: true
                },
                branch: true,
            },
        });
        if (!branchUser) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Not found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return branchUser;
    }
    async update(id, dto) {
        return this.branchUserRepository.manager.transaction(async (entityManager) => {
            try {
                let branchUser = await entityManager.findOne(BranchUser_1.BranchUser, {
                    where: {
                        branchUserId: id,
                        active: true,
                    },
                });
                if (!branchUser) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: "Not found",
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                branchUser.name = dto.name;
                branchUser.email = dto.email;
                branchUser.mobileNumber = dto.mobileNumber;
                branchUser = await entityManager.save(BranchUser_1.BranchUser, branchUser);
                branchUser = await entityManager.findOne(BranchUser_1.BranchUser, {
                    where: {
                        branchUserId: branchUser?.branchUserId,
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true
                        },
                        branch: true,
                    },
                });
                let user = branchUser.user;
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
                branchUser.user = user;
                return branchUser;
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
            const branchUser = await this.branchUserRepository.findOne({
                where: {
                    branchUserId: id,
                    active: true,
                },
                relations: {
                    user: {
                        access: true
                    },
                    branch: true,
                },
            });
            if (!branchUser) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            branchUser.active = false;
            return await this.branchUserRepository.save(branchUser);
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
exports.BranchUserService = BranchUserService;
exports.BranchUserService = BranchUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [branch_user_repository_1.BranchUserRepository])
], BranchUserService);
//# sourceMappingURL=branch-user.service.js.map