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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_constant_1 = require("../../../shared/constants/user.constant");
const user_role_constant_1 = require("../../../shared/constants/user-role.constant");
const CustomerUser_1 = require("../../../database/entities/CustomerUser");
const user_repository_1 = require("../../../database/repositories/user.repository");
const CorporateUser_1 = require("../../../database/entities/CorporateUser");
const BranchUser_1 = require("../../../database/entities/BranchUser");
const DriverUser_1 = require("../../../database/entities/DriverUser");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    error: user_constant_1.USER_ERROR_USER_NOT_FOUND,
                    message: user_constant_1.USER_ERROR_USER_NOT_FOUND,
                    errorCode: "USER_ERROR_USER_NOT_FOUND",
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (user.role === user_role_constant_1.USER_ROLE.CORPORATE) {
                return await this.userRepository.manager.findOne(CorporateUser_1.CorporateUser, {
                    where: {
                        user: {
                            userId,
                            role: user_role_constant_1.USER_ROLE.CORPORATE,
                            active: true,
                        },
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true,
                        },
                    },
                });
            }
            else if (user.role === user_role_constant_1.USER_ROLE.BRANCH) {
                return await this.userRepository.manager.findOne(BranchUser_1.BranchUser, {
                    where: {
                        user: {
                            userId,
                            role: user_role_constant_1.USER_ROLE.BRANCH,
                            active: true,
                        },
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true
                        },
                    },
                });
            }
            else if (user.role === user_role_constant_1.USER_ROLE.DRIVER) {
                return await this.userRepository.manager.findOne(DriverUser_1.DriverUser, {
                    where: {
                        user: {
                            userId,
                            role: user_role_constant_1.USER_ROLE.DRIVER,
                            active: true,
                        },
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true
                        },
                    },
                });
            }
            else {
                return await this.userRepository.manager.findOne(CustomerUser_1.CustomerUser, {
                    where: {
                        user: {
                            userId,
                            role: user_role_constant_1.USER_ROLE.CUSTOMER,
                            active: true,
                        },
                        active: true,
                    },
                    relations: {
                        user: {
                            access: true
                        },
                        customerAddresses: true,
                    },
                });
            }
        }
        catch (ex) {
            throw ex;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map