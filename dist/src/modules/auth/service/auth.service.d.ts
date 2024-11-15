import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/service/user.service";
import { Connection, Repository } from "typeorm";
import { TokenService } from "./token.service";
import { UserAuth } from "src/database/entities/UserAuth";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { RegisterCustomerUserDto } from "../dto/register.dto";
import { EmailService } from "src/shared/services/email.service";
import { RequestMetadataModel } from "src/common/models/request-metadata.model";
import { AUTH_TOKENT_TYPE } from "src/shared/constants/auth-token-type.constant";
import { UserAuthLog } from "src/database/entities/UserAuthLog";
import { AUTH_EVENT_TYPE } from "src/shared/constants/auth-event-type.constant";
import { AUTH_STATUS } from "src/shared/constants/auth-status.constant";
import { CustomerUser } from "../../../database/entities/CustomerUser";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";
import { CustomerUserService } from "src/modules/customer-user/customer-user.service";
export declare class AuthService {
    private readonly userAuthRepo;
    private readonly userService;
    private customerUserService;
    private emailService;
    private connection;
    private readonly configService;
    private tokenService;
    constructor(userAuthRepo: Repository<UserAuth>, userService: UserService, customerUserService: CustomerUserService, emailService: EmailService, connection: Connection, configService: ConfigService, tokenService: TokenService);
    generateStateToken(payload: {
        sessionId: string;
        userAgent: string;
        ipAddress: string;
        timezone: string;
        geolocation: string;
    }): Promise<string>;
    generateAuthToken({ userId, authMethod, providerUserId, role, brand, sessionId }: {
        userId: any;
        authMethod: any;
        providerUserId: any;
        role: any;
        brand: any;
        sessionId: any;
    }, requestMetadata: RequestMetadataModel, tokenType: AUTH_TOKENT_TYPE, expiresIn: any, data?: {}, connection?: Connection): Promise<string>;
    registerCustomer(dto: RegisterCustomerUserDto, requestMetadata: RequestMetadataModel): Promise<CustomerUser>;
    resendEmailVerification(providerUser: any, requestMetadata: RequestMetadataModel): Promise<any>;
    linkSocialAccount(userId: string, authMethod: AUTH_METHOD, providerUserId: string): Promise<UserAuth>;
    validateUserCredentials({ email, password }: {
        email: any;
        password: any;
    }, requestMetadata: RequestMetadataModel): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    confirmSocialLogin({ userId, providerUserId, authMethod, role, sessionId }: {
        userId: any;
        providerUserId: any;
        authMethod: any;
        role: any;
        sessionId: any;
    }, newAuthMethod: AUTH_METHOD, requestMetadata: RequestMetadataModel): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUserAuth(providerUserId: any, authMethod: AUTH_METHOD): Promise<UserAuth>;
    generateUserAuthLog(userAuthId: string, userAgent: string, eventType: AUTH_EVENT_TYPE, authMethod: AUTH_METHOD, sessionId: string, status: AUTH_STATUS, accessToken: string, refreshToken: string, brand: BRAND_TYPE, connection?: Connection): Promise<UserAuthLog>;
    validateVerificationToken(token: string): Promise<boolean>;
    logOut(userId: string, sessionId: string): Promise<void>;
    refreshToken(oldRefreshToken: string, userId: string, sessionId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(userId: any): Promise<BranchUser | import("../../../database/entities/CorporateUser").CorporateUser | CustomerUser | DriverUser>;
}
