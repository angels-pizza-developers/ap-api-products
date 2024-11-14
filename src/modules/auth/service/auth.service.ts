import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/service/user.service";
import { Connection, Repository } from "typeorm";
import { TokenService } from "./token.service";
import { UserAuth } from "src/database/entities/UserAuth";
import { InjectRepository } from "@nestjs/typeorm";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import {
  LINK_SOCIAL_ERROR,
  LOGIN_ERROR_PASSWORD_INCORRECT,
  LOGIN_ERROR_EMAIL_NOT_FOUND,
  REGISTER_ERROR_EMAIL_USED,
  VERIFICATION_ERROR_FAILED,
  VERIFICATION_ERROR_FAILED_INVALID,
  VERIFICATION_ERROR_FAILED_USED,
  LOGIN_ERROR_NOT_VERIFIED,
  REFRESH_ERROR_INVALID_TOKEN,
  AUTH_ERROR_INVALID_CREDENTIALS,
  LOGIN_ERROR_SOCIAL_SERVICE_ERROR,
  AUTH_ERROR_REQUEST_ERROR,
  VERIFICATION_ERROR_INVALID_EMAIL,
} from "src/shared/constants/auth-error.constant";
import { compare } from "src/shared/utils/hash.utils";
import { RegisterCustomerUserDto } from "../dto/register.dto";
import { EmailService } from "src/shared/services/email.service";
import { RequestMetadataModel } from "src/common/models/request-metadata.model";
import { UserAuthTokenLog } from "src/database/entities/UserAuthTokenLog";
import { AUTH_TOKENT_TYPE } from "src/shared/constants/auth-token-type.constant";
import moment from "moment-timezone";
import { AUTH_TOKEN_STATUS } from "src/shared/constants/auth-token-status.constant";
import { User } from "src/database/entities/User";
import { UserAuthLog } from "src/database/entities/UserAuthLog";
import { AUTH_EVENT_TYPE } from "src/shared/constants/auth-event-type.constant";
import { AUTH_STATUS } from "src/shared/constants/auth-status.constant";
import { CustomerUser } from "../../../database/entities/CustomerUser";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";
import { CustomerUserService } from "src/modules/customer-user/customer-user.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepo: Repository<UserAuth>,
    private readonly userService: UserService, // Inject UsersService here
    private customerUserService: CustomerUserService, // Inject UsersService here
    private emailService: EmailService,
    private connection: Connection,
    private readonly configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  async generateStateToken(payload: {
    sessionId: string;
    userAgent: string;
    ipAddress: string;
    timezone: string;
    geolocation: string;
  }) {
    try {
      const { token } = this.tokenService.generateStateToken(
        payload,
        this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
      );
      return token;
    } catch (ex) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: AUTH_ERROR_INVALID_CREDENTIALS,
          message: AUTH_ERROR_INVALID_CREDENTIALS,
          errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  // Login method to create and return JWT
  async generateAuthToken(
    { userId, authMethod, providerUserId, role, brand, sessionId },
    requestMetadata: RequestMetadataModel,
    tokenType: AUTH_TOKENT_TYPE,
    expiresIn,
    data = {},
    connection: Connection = this.connection,
  ) {
    return connection.manager.transaction(async (entityManager) => {
      if (
        !userId ||
        userId === "" ||
        !authMethod ||
        authMethod === "" ||
        !role ||
        role === ""
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: AUTH_ERROR_INVALID_CREDENTIALS,
            message: AUTH_ERROR_INVALID_CREDENTIALS,
            errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const userAuth = await entityManager.findOne(UserAuth, {
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
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: AUTH_ERROR_INVALID_CREDENTIALS,
            message: AUTH_ERROR_INVALID_CREDENTIALS,
            errorCode: "AUTH_ERROR_INVALID_CREDENTIALS",
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const { token, decoded } = this.tokenService.generateToken(
        {
          brand,
          userId,
          authMethod,
          providerUserId,
          role,
          tokenType,
          data,
          sessionId,
        },
        expiresIn,
      );

      if (token) {
        const userAuthTokenLog = new UserAuthTokenLog();
        userAuthTokenLog.userAuth = userAuth;
        userAuthTokenLog.token = token;
        userAuthTokenLog.status = AUTH_TOKEN_STATUS.ACTIVE;
        userAuthTokenLog.tokenType = tokenType;
        userAuthTokenLog.issuedAt = moment
          .unix(decoded?.iat)
          .tz("UTC")
          .toDate();
        userAuthTokenLog.expiresAt = moment
          .unix(decoded?.exp)
          .tz("UTC")
          .toDate();
        userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
        userAuthTokenLog.userAgent = requestMetadata["user-agent"];
        userAuthTokenLog.geolocation = requestMetadata.geolocation;
        userAuthTokenLog.brand = BRAND_TYPE.ANGELS_PIZZA;
        await entityManager.save(UserAuthTokenLog, userAuthTokenLog);
      }
      return token;
    });
  }

  async registerCustomer(
    dto: RegisterCustomerUserDto,
    requestMetadata: RequestMetadataModel,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const customerUser = await this.customerUserService.registerCustomer(
          dto,
          AUTH_METHOD.PASSWORD as any,
          entityManager.connection,
        );

        const { token, decoded } = await this.tokenService.generateToken(
          {
            brand: BRAND_TYPE.ANGELS_PIZZA as any,
            userId: customerUser.user?.userId,
            authMethod: AUTH_METHOD.PASSWORD,
            providerUserId: dto.email,
            role: USER_ROLE.CUSTOMER,
            tokenType: AUTH_TOKENT_TYPE.EMAIL_VERIFICATION,
            sessionId: requestMetadata["sessionId"],
          },
          this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
        );
        if (token) {
          const userAuth = customerUser.user.userAuths[0];
          const userAuthTokenLog = new UserAuthTokenLog();
          userAuthTokenLog.userAuth = userAuth;
          userAuthTokenLog.token = token;
          userAuthTokenLog.status = AUTH_TOKEN_STATUS.PENDING_VERIFICATION;
          userAuthTokenLog.tokenType = AUTH_TOKENT_TYPE.EMAIL_VERIFICATION;
          userAuthTokenLog.issuedAt = moment
            .unix(decoded?.iat)
            .tz("UTC")
            .toDate();
          userAuthTokenLog.expiresAt = moment
            .unix(decoded?.exp)
            .tz("UTC")
            .toDate();
          userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
          userAuthTokenLog.userAgent = requestMetadata["user-agent"];
          userAuthTokenLog.geolocation = requestMetadata.geolocation;
          userAuthTokenLog.brand = BRAND_TYPE.ANGELS_PIZZA;
          await entityManager.save(UserAuthTokenLog, userAuthTokenLog);
        }

        await this.emailService.sendEmailVerification(
          dto.email,
          `${dto.firstName} ${dto.lastName}`,
          token,
          this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
        );
        return customerUser;
      } catch (ex) {
        if (
          ex["message"] &&
          (ex["message"].includes("duplicate key") ||
            ex["message"].includes("violates unique constraint")) &&
          ex["message"].includes("user")
        ) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: "This email is already registered",
              message: REGISTER_ERROR_EMAIL_USED,
              errorCode: "REGISTER_ERROR_EMAIL_USED",
            },
            HttpStatus.BAD_REQUEST,
          );
        } else if (
          ex["message"] &&
          ex["message"].toLowerCase().includes("used") &&
          ex["message"].toLowerCase().includes("email")
        ) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: "This email is already registered",
              message: REGISTER_ERROR_EMAIL_USED,
              errorCode: "REGISTER_ERROR_EMAIL_USED",
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw ex;
        }
      }
    });
  }

  async resendEmailVerification(
    providerUser,
    requestMetadata: RequestMetadataModel,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const userAuth = await entityManager.findOne(UserAuth, {
          where: {
            providerUserId: providerUser,
            active: true,
          },
          relations: {
            user: true,
          },
        });

        if (!userAuth || !userAuth?.user) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: VERIFICATION_ERROR_INVALID_EMAIL,
              message: VERIFICATION_ERROR_INVALID_EMAIL,
              errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        let fullName;
        if (userAuth?.user.role === USER_ROLE.CUSTOMER) {
          const customer = await entityManager.findOne(CustomerUser, {
            where: {
              user: {
                userId: userAuth?.user?.userId,
              },
            },
          });

          if (!customer) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                error: VERIFICATION_ERROR_INVALID_EMAIL,
                message: VERIFICATION_ERROR_INVALID_EMAIL,
                errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          fullName = `${customer.firstName} ${customer.lastName}`;
        } else if (userAuth?.user.role === USER_ROLE.BRANCH) {
          const branchUser = await entityManager.findOne(BranchUser, {
            where: {
              user: {
                userId: userAuth?.user?.userId,
              },
            },
          });

          if (!branchUser) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                error: VERIFICATION_ERROR_INVALID_EMAIL,
                message: VERIFICATION_ERROR_INVALID_EMAIL,
                errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          fullName = branchUser.name;
        } else if (userAuth?.user.role === USER_ROLE.DRIVER) {
          const driverUser = await entityManager.findOne(DriverUser, {
            where: {
              user: {
                userId: userAuth?.user?.userId,
              },
            },
          });

          if (!driverUser) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                error: VERIFICATION_ERROR_INVALID_EMAIL,
                message: VERIFICATION_ERROR_INVALID_EMAIL,
                errorCode: "VERIFICATION_ERROR_INVALID_EMAIL",
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          fullName = driverUser.name;
        }

        const { token, decoded } = await this.tokenService.generateToken(
          {
            brand: BRAND_TYPE.ANGELS_PIZZA as any,
            userId: userAuth.user?.userId,
            authMethod: AUTH_METHOD.PASSWORD,
            providerUserId: providerUser,
            role: userAuth?.user.role,
            tokenType: AUTH_TOKENT_TYPE.EMAIL_VERIFICATION,
            sessionId: requestMetadata["sessionId"],
          },
          this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
        );
        if (token) {
          const userAuthTokenLog = new UserAuthTokenLog();
          userAuthTokenLog.userAuth = userAuth;
          userAuthTokenLog.token = token;
          userAuthTokenLog.status = AUTH_TOKEN_STATUS.PENDING_VERIFICATION;
          userAuthTokenLog.tokenType = AUTH_TOKENT_TYPE.EMAIL_VERIFICATION;
          userAuthTokenLog.issuedAt = moment
            .unix(decoded?.iat)
            .tz("UTC")
            .toDate();
          userAuthTokenLog.expiresAt = moment
            .unix(decoded?.exp)
            .tz("UTC")
            .toDate();
          userAuthTokenLog.ipAddress = requestMetadata.ipAddress;
          userAuthTokenLog.userAgent = requestMetadata["user-agent"];
          userAuthTokenLog.geolocation = requestMetadata.geolocation;
          userAuthTokenLog.brand = BRAND_TYPE.ANGELS_PIZZA;
          await entityManager.save(UserAuthTokenLog, userAuthTokenLog);
        }

        await this.emailService.sendEmailVerification(
          providerUser,
          fullName,
          token,
          this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
        );
        return providerUser;
      } catch (ex) {
        throw ex;
      }
    });
  }

  // Link Facebook account to an existing user
  async linkSocialAccount(
    userId: string,
    authMethod: AUTH_METHOD,
    providerUserId: string,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const user = await entityManager.findOneBy(User, { userId });
        let userAuth = await entityManager.findOneBy(UserAuth, {
          user: { userId },
          authMethod,
          providerUserId,
        });
        if (!userAuth) {
          userAuth = new UserAuth();
          userAuth.user = user;
          userAuth.authMethod = authMethod;
          userAuth.providerUserId = providerUserId;
          userAuth.isVerified = true;
        } else {
          userAuth.isVerified = true;
        }
        userAuth = await entityManager.save(UserAuth, userAuth);
        return userAuth;
      } catch (ex) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: LINK_SOCIAL_ERROR,
            message: LINK_SOCIAL_ERROR,
            errorCode: "LINK_SOCIAL_ERROR",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async validateUserCredentials(
    { email, password },
    requestMetadata: RequestMetadataModel,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      const userAuth = await entityManager.findOne(UserAuth, {
        where: {
          authMethod: AUTH_METHOD.PASSWORD as any,
          providerUserId: email,
          user: {
            role: requestMetadata.role,
            brand: BRAND_TYPE.ANGELS_PIZZA as any,
          },
        },
        relations: {
          user: true,
        },
      });
      if (!userAuth) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: LOGIN_ERROR_EMAIL_NOT_FOUND,
            message: LOGIN_ERROR_EMAIL_NOT_FOUND,
            errorCode: "LOGIN_ERROR_EMAIL_NOT_FOUND",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!userAuth.isVerified) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: LOGIN_ERROR_NOT_VERIFIED,
            message: LOGIN_ERROR_NOT_VERIFIED,
            errorCode: "LOGIN_ERROR_NOT_VERIFIED",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const passwordMatch = await compare(userAuth.passwordHash, password);
      if (!passwordMatch) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: LOGIN_ERROR_PASSWORD_INCORRECT,
            message: LOGIN_ERROR_PASSWORD_INCORRECT,
            errorCode: "LOGIN_ERROR_PASSWORD_INCORRECT",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const accessToken = await this.generateAuthToken(
        {
          brand: BRAND_TYPE.ANGELS_PIZZA as any,
          userId: userAuth.user.userId,
          authMethod: AUTH_METHOD.PASSWORD as any,
          providerUserId: email,
          role: requestMetadata.role,
          sessionId: requestMetadata["sessionId"] ?? "",
        },
        {} as RequestMetadataModel,
        AUTH_TOKENT_TYPE.ACCESS,
        this.configService.get<string>("AUTH_ACCESS_TOKEN_EXPIRE"),
        {},
        entityManager.connection,
      );
      const refreshToken = await this.generateAuthToken(
        {
          brand: BRAND_TYPE.ANGELS_PIZZA as any,
          userId: userAuth.user.userId,
          authMethod: AUTH_METHOD.PASSWORD as any,
          providerUserId: email,
          role: requestMetadata.role,
          sessionId: requestMetadata["sessionId"] ?? "",
        },
        {} as RequestMetadataModel,
        AUTH_TOKENT_TYPE.REFRESH,
        this.configService.get<string>("AUTH_REFRESH_TOKEN_EXPIRE"),
        {},
        entityManager.connection,
      );

      await this.generateUserAuthLog(
        userAuth.userAuthId,
        requestMetadata["user-agent"] ?? "",
        AUTH_EVENT_TYPE.LOGIN,
        AUTH_METHOD.PASSWORD,
        requestMetadata["sessionId"] ?? "",
        AUTH_STATUS.SUCCESS,
        accessToken,
        refreshToken,
        BRAND_TYPE.ANGELS_PIZZA,
        entityManager.connection,
      );

      return {
        accessToken,
        refreshToken,
      };
    });
  }

  async confirmSocialLogin(
    { userId, providerUserId, authMethod, role, sessionId },
    newAuthMethod: AUTH_METHOD,
    requestMetadata: RequestMetadataModel,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const userAuth = await entityManager.findOneBy(UserAuth, {
          user: { userId },
          authMethod,
          providerUserId,
        });
        if (!userAuth) {
          throw new HttpException(
            {
              statusCode: HttpStatus.UNAUTHORIZED,
              error: LOGIN_ERROR_SOCIAL_SERVICE_ERROR,
              message: LOGIN_ERROR_SOCIAL_SERVICE_ERROR,
              errorCode: "LOGIN_ERROR_SOCIAL_SERVICE_ERROR",
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
        // Generate your own JWT
        const accessToken = await this.generateAuthToken(
          {
            userId,
            providerUserId,
            authMethod: newAuthMethod,
            role,
            sessionId: sessionId ?? "",
            brand: BRAND_TYPE.ANGELS_PIZZA,
          },
          requestMetadata ?? ({} as any),
          AUTH_TOKENT_TYPE.ACCESS,
          this.configService.get<string>("AUTH_ACCESS_TOKEN_EXPIRE"),
          {},
          entityManager.connection,
        );
        // Generate your own JWT
        const refreshToken = await this.generateAuthToken(
          {
            userId,
            providerUserId,
            authMethod: newAuthMethod,
            role,
            sessionId: sessionId ?? "",
            brand: BRAND_TYPE.ANGELS_PIZZA,
          },
          requestMetadata,
          AUTH_TOKENT_TYPE.REFRESH,
          this.configService.get<string>("AUTH_REFRESH_TOKEN_EXPIRE"),
          {},
          entityManager.connection,
        );

        await this.generateUserAuthLog(
          userAuth.userAuthId,
          requestMetadata["user-agent"] ?? "",
          AUTH_EVENT_TYPE.LOGIN,
          newAuthMethod,
          requestMetadata["sessionId"] ?? "",
          AUTH_STATUS.SUCCESS,
          accessToken,
          refreshToken,
          BRAND_TYPE.ANGELS_PIZZA,
          entityManager.connection,
        );
        return { accessToken, refreshToken };
      } catch (ex) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Unauthorized",
            message: AUTH_ERROR_REQUEST_ERROR,
            errorCode: "AUTH_ERROR_REQUEST_ERROR",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async validateUserAuth(providerUserId, authMethod: AUTH_METHOD) {
    const userAuth = await this.userAuthRepo.findOne({
      where: {
        authMethod,
        providerUserId,
        user: {
          brand: BRAND_TYPE.ANGELS_PIZZA,
          active: true,
        },
      },
      relations: {
        user: true,
      },
    });
    return userAuth;
  }

  async generateUserAuthLog(
    userAuthId: string,
    userAgent: string,
    eventType: AUTH_EVENT_TYPE,
    authMethod: AUTH_METHOD,
    sessionId: string,
    status: AUTH_STATUS,
    accessToken: string,
    refreshToken: string,
    brand: BRAND_TYPE,
    connection = this.connection,
  ) {
    return connection.manager.transaction(async (entityManager) => {
      try {
        const userAuth = await entityManager.findOneBy(UserAuth, {
          userAuthId,
        });
        const userAuthLog = new UserAuthLog();
        userAuthLog.userAuth = userAuth;
        userAuthLog.userAgent = userAgent;
        userAuthLog.eventType = eventType;
        userAuthLog.authMethod = authMethod as any;
        userAuthLog.sessionId = sessionId;
        userAuthLog.status = status;
        userAuthLog.accessToken = accessToken;
        userAuthLog.refreshToken = refreshToken;
        userAuthLog.brand = brand;
        return await entityManager.save(UserAuthLog, userAuthLog);
      } catch (ex) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Unauthorized",
            message: AUTH_ERROR_REQUEST_ERROR,
            errorCode: "AUTH_ERROR_REQUEST_ERROR",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async validateVerificationToken(token: string): Promise<boolean> {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const { brand, userId, authMethod, providerUserId, role } =
          this.tokenService.verifyEmailVerificationToken(token);
        // Update user status to verified

        const userAuthTokenLog = await entityManager.findOne(UserAuthTokenLog, {
          where: { token },
        });

        if (!userAuthTokenLog) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: "Unauthorized",
              message: VERIFICATION_ERROR_FAILED_INVALID,
              errorCode: "VERIFICATION_ERROR_FAILED_INVALID",
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        if (userAuthTokenLog.status === AUTH_TOKEN_STATUS.VERIFIED) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: "Unauthorized",
              message: VERIFICATION_ERROR_FAILED_USED,
              errorCode: "VERIFICATION_ERROR_FAILED_USED",
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        userAuthTokenLog.status = AUTH_TOKEN_STATUS.VERIFIED;
        await entityManager.save(UserAuthTokenLog, userAuthTokenLog);

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
          throw new UnauthorizedException();
        }
        userAuth.isVerified = true;
        userAuth = await entityManager.save(UserAuth, userAuth);
        userAuth.user.isVerified = true;
        await entityManager.save(User, userAuth.user);
        return true;
      } catch (e) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Unauthorized",
            message: VERIFICATION_ERROR_FAILED,
            errorCode: "VERIFICATION_ERROR_FAILED",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async logOut(userId: string, sessionId: string) {
    this.userAuthRepo.manager.transaction(async (entityManager) => {
      try {
        const userAuthLog = await entityManager.findOne(UserAuthLog, {
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
          userAuthLog.status = AUTH_STATUS.EXPIRED;
          userAuthLog.logOutAt = moment.tz("utc").toDate();
          await entityManager.save(UserAuthLog, userAuthLog);
        }
      } catch (e) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Unauthorized",
            message: VERIFICATION_ERROR_FAILED,
            errorCode: "VERIFICATION_ERROR_FAILED",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  // Validate Refresh Token and Generate New Access Token
  async refreshToken(
    oldRefreshToken: string,
    userId: string,
    sessionId: string,
  ) {
    return this.userAuthRepo.manager.transaction(async (entityManager) => {
      const userAuthLog = await entityManager.findOne(UserAuthLog, {
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
      if (
        !userAuthLog ||
        !userAuthLog?.userAuth ||
        !userAuthLog?.userAuth?.user
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Invalid refresh token",
            message: REFRESH_ERROR_INVALID_TOKEN,
            errorCode: "REFRESH_ERROR_INVALID_TOKEN",
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const valid = await compare(oldRefreshToken, userAuthLog.refreshToken);
      if (!valid) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Invalid refresh token",
            message: REFRESH_ERROR_INVALID_TOKEN,
            errorCode: "REFRESH_ERROR_INVALID_TOKEN",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const accessToken = await this.generateAuthToken(
        {
          brand: BRAND_TYPE.ANGELS_PIZZA as any,
          userId: userAuthLog?.userAuth?.user?.userId,
          authMethod: userAuthLog?.userAuth?.authMethod,
          providerUserId: userAuthLog?.userAuth?.providerUserId,
          role: userAuthLog?.userAuth?.user?.role,
          sessionId,
        },
        {} as RequestMetadataModel,
        AUTH_TOKENT_TYPE.ACCESS,
        this.configService.get<string>("AUTH_ACCESS_TOKEN_EXPIRE"),
        {},
        entityManager.connection,
      );
      const refreshToken = await this.generateAuthToken(
        {
          brand: BRAND_TYPE.ANGELS_PIZZA as any,
          userId: userAuthLog?.userAuth?.user?.userId,
          authMethod: userAuthLog?.userAuth?.authMethod,
          providerUserId: userAuthLog?.userAuth?.providerUserId,
          role: userAuthLog?.userAuth?.user?.role,
          sessionId,
        },
        {} as RequestMetadataModel,
        AUTH_TOKENT_TYPE.REFRESH,
        this.configService.get<string>("AUTH_REFRESH_TOKEN_EXPIRE"),
        {},
        entityManager.connection,
      );
      return { accessToken, refreshToken };
    });
  }

  async getProfile(userId) {
    return this.userService.getProfile(userId);
  }
}
