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
exports.CustomerUserService = void 0;
const common_1 = require("@nestjs/common");
const CustomerUser_1 = require("../../database/entities/CustomerUser");
const User_1 = require("../../database/entities/User");
const UserAuth_1 = require("../../database/entities/UserAuth");
const auth_method_constant_1 = require("../../shared/constants/auth-method.constant");
const user_role_constant_1 = require("../../shared/constants/user-role.constant");
const hash_utils_1 = require("../../shared/utils/hash.utils");
const auth_error_constant_1 = require("../../shared/constants/auth-error.constant");
const brand_constant_1 = require("../../shared/constants/brand.constant");
const customer_user_repository_1 = require("../../database/repositories/customer-user.repository");
const entity_utils_1 = require("../../shared/utils/entity.utils");
let CustomerUserService = class CustomerUserService {
    constructor(customerUserRepo) {
        this.customerUserRepo = customerUserRepo;
    }
    async registerCustomer(dto, authMethod, connection = this.customerUserRepo.manager.connection) {
        try {
            let userAuth = new UserAuth_1.UserAuth();
            let user = new User_1.User();
            let customerUser = new CustomerUser_1.CustomerUser();
            userAuth = await connection.manager.findOne(UserAuth_1.UserAuth, {
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
            if ((userAuth && userAuth.isVerified) ||
                (userAuth && userAuth.user?.isVerified)) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    error: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                    message: auth_error_constant_1.REGISTER_ERROR_EMAIL_USED,
                    errorCode: "REGISTER_ERROR_EMAIL_USED",
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!userAuth) {
                user = new User_1.User();
                user.role = user_role_constant_1.USER_ROLE.CUSTOMER;
                user.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
                user.isVerified = false;
                user = await connection.manager.save(User_1.User, user);
                userAuth = new UserAuth_1.UserAuth();
                userAuth.user = user;
                userAuth.authMethod = authMethod;
                userAuth.providerUserId = dto.email;
                userAuth.isVerified = false;
                userAuth.passwordHash = await (0, hash_utils_1.hash)(dto.password);
                if (authMethod === "PASSWORD" &&
                    (!dto.password || dto.password === "")) {
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        error: "Password is required",
                        message: auth_error_constant_1.REGISTER_ERROR_PASSWORD_EMPTY,
                        errorCode: "REGISTER_ERROR_PASSWORD_EMPTY",
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                userAuth = await connection.manager.save(UserAuth_1.UserAuth, userAuth);
                customerUser = new CustomerUser_1.CustomerUser();
                customerUser.user = user;
            }
            else {
                customerUser = await connection.manager.findOne(CustomerUser_1.CustomerUser, {
                    where: {
                        active: true,
                        user: {
                            userId: userAuth.user.userId,
                            active: true,
                        },
                    },
                });
            }
            if (!customerUser) {
                customerUser = new CustomerUser_1.CustomerUser();
                customerUser.user = user;
            }
            customerUser.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
            customerUser.firstName = dto.firstName;
            customerUser.middleName = dto.middleName;
            customerUser.lastName = dto.lastName;
            customerUser.fullName = (0, entity_utils_1.getFullName)(dto.firstName, dto.middleName, dto.lastName);
            if (authMethod === auth_method_constant_1.AUTH_METHOD.PASSWORD.toString()) {
                customerUser.email = dto.email;
                customerUser.mobileNumber = dto.mobileDetails.mobileNumber;
                customerUser.mobileCountryCode = dto.mobileDetails.mobileCountryCode;
            }
            customerUser = await connection.manager.save(CustomerUser_1.CustomerUser, customerUser);
            customerUser = await connection.manager.findOne(CustomerUser_1.CustomerUser, {
                where: {
                    customerUserId: customerUser?.customerUserId,
                },
                relations: {
                    user: {
                        userAuths: true,
                    },
                },
            });
            return customerUser;
        }
        catch (ex) {
            throw ex;
        }
    }
};
exports.CustomerUserService = CustomerUserService;
exports.CustomerUserService = CustomerUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_user_repository_1.CustomerUserRepository])
], CustomerUserService);
//# sourceMappingURL=customer-user.service.js.map