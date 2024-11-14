import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/service/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { User } from "src/database/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleStrategy } from "./strategies/google.strategy";
import { FacebookStrategy } from "./strategies/facebook.strategy";
import { AutoMapperModule } from "src/common/auto-mapper/auto-mapper.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./service/auth.service";
import { TokenService } from "./service/token.service";
import { CustomerUser } from "src/database/entities/CustomerUser";
import { CorporateUser } from "src/database/entities/CorporateUser";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";
import { UserAuth } from "src/database/entities/UserAuth";
import { EmailService } from "src/shared/services/email.service";
import { UserRepository } from "src/database/repositories/user.repository";
import { CustomerUserService } from "../customer-user/customer-user.service";
import { CustomerUserRepository } from "src/database/repositories/customer-user.repository";

@Module({
  imports: [
    AutoMapperModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // Fetch secret from environment variable
        signOptions: { expiresIn: "60m" },
        verifyOptions: { ignoreExpiration: false },
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      UserAuth,
      CustomerUser,
      CorporateUser,
      BranchUser,
      DriverUser,
      UserRepository,
      CustomerUserRepository,
    ]), // Register product entity and repository
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
    TokenService,
    CustomerUserService,
    EmailService,
  ],
})
export class AuthModule {}
