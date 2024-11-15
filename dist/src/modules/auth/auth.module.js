"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const user_service_1 = require("../user/service/user.service");
const jwt_1 = require("@nestjs/jwt");
const User_1 = require("../../database/entities/User");
const typeorm_1 = require("@nestjs/typeorm");
const google_strategy_1 = require("./strategies/google.strategy");
const facebook_strategy_1 = require("./strategies/facebook.strategy");
const auto_mapper_module_1 = require("../../common/auto-mapper/auto-mapper.module");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const user_module_1 = require("../user/user.module");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./service/auth.service");
const token_service_1 = require("./service/token.service");
const CustomerUser_1 = require("../../database/entities/CustomerUser");
const CorporateUser_1 = require("../../database/entities/CorporateUser");
const BranchUser_1 = require("../../database/entities/BranchUser");
const DriverUser_1 = require("../../database/entities/DriverUser");
const UserAuth_1 = require("../../database/entities/UserAuth");
const email_service_1 = require("../../shared/services/email.service");
const user_repository_1 = require("../../database/repositories/user.repository");
const customer_user_service_1 = require("../customer-user/customer-user.service");
const customer_user_repository_1 = require("../../database/repositories/customer-user.repository");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auto_mapper_module_1.AutoMapperModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: { expiresIn: "60m" },
                    verifyOptions: { ignoreExpiration: false },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([
                User_1.User,
                UserAuth_1.UserAuth,
                CustomerUser_1.CustomerUser,
                CorporateUser_1.CorporateUser,
                BranchUser_1.BranchUser,
                DriverUser_1.DriverUser,
                user_repository_1.UserRepository,
                customer_user_repository_1.CustomerUserRepository,
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            jwt_1.JwtService,
            google_strategy_1.GoogleStrategy,
            facebook_strategy_1.FacebookStrategy,
            jwt_strategy_1.JwtStrategy,
            token_service_1.TokenService,
            customer_user_service_1.CustomerUserService,
            email_service_1.EmailService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map