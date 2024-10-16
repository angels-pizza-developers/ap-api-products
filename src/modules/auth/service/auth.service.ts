import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/service/user.service';
import { Connection, Repository } from 'typeorm';
import { TokenService } from './token.service';
import { CustomerUserService } from 'src/modules/user/service/customer-user.service';
import { UserAuth } from 'src/database/entities/UserAuth';
import { InjectRepository } from '@nestjs/typeorm';
import { BRAND_TYPE } from 'src/shared/constants/brand.constant';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';
import {
  LOGIN_ERROR_FAILED,
  LOGIN_ERROR_PASSWORD_INCORRECT,
  LOGIN_ERROR_USERNAME_NOT_FOUND,
} from 'src/shared/constants/auth-error.constant';
import { compare } from 'src/shared/utils/hash.utils';
import { RegisterCustomerUserDto } from '../dto/register.dto';
import { EmailService } from 'src/shared/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepo: Repository<UserAuth>,
    private readonly userService: UserService, // Inject UsersService here
    private readonly customerUserService: CustomerUserService, // Inject UsersService here
    private readonly emailService: EmailService,
    private readonly connection: Connection,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  // Login method to create and return JWT
  async oauthGenerateToken({
    userId,
    authMethod,
    providerUserId,
    role,
    brand,
  }) {
    if (
      !userId ||
      userId === '' ||
      !authMethod ||
      authMethod === '' ||
      !role ||
      role === ''
    ) {
      throw new UnauthorizedException();
    }
    const userAuth = await this.userAuthRepo.findOne({
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
    return this.tokenService.genrateToken({
      brand,
      userId,
      authMethod,
      providerUserId,
      role,
    });
  }

  async registerCustomer(dto: RegisterCustomerUserDto) {
    try {
      const customerUser = await this.customerUserService.registerCustomer(
        dto,
        AUTH_METHOD.PASSWORD as any,
      );

      const token = await this.tokenService.genrateToken({
        brand: BRAND_TYPE.ANGELS_PIZZA as any,
        userId: customerUser.user?.userId,
        authMethod: AUTH_METHOD.PASSWORD,
        providerUserId: dto.email,
        role: USER_ROLE.CUSTOMER,
      });
      await this.emailService.sendEmailVerification(
        dto.email,
        `${dto.firstName} ${dto.lastName}`,
        token,
      );
      return customerUser;
    } catch (ex) {
      if (
        ex['message'] &&
        (ex['message'].includes('duplicate key') ||
          ex['message'].includes('violates unique constraint')) &&
        ex['message'].includes('user')
      ) {
        throw Error('Username already used!');
      } else {
        throw Error(LOGIN_ERROR_FAILED);
      }
    }
  }

  async loginCustomer({ username, password }) {
    const userAuth = await this.userAuthRepo.findOne({
      where: {
        authMethod: AUTH_METHOD.PASSWORD as any,
        providerUserId: username,
        user: {
          role: USER_ROLE.CUSTOMER as any,
          brand: BRAND_TYPE.ANGELS_PIZZA as any,
        },
      },
      relations: {
        user: true,
      },
    });
    if (!userAuth) {
      throw Error(LOGIN_ERROR_USERNAME_NOT_FOUND);
    }
    const passwordMatch = await compare(userAuth.passwordHash, password);
    if (!passwordMatch) {
      throw Error(LOGIN_ERROR_PASSWORD_INCORRECT);
    }
    const access_token = this.tokenService.genrateToken({
      brand: BRAND_TYPE.ANGELS_PIZZA as any,
      userId: userAuth.user.userId,
      authMethod: AUTH_METHOD.PASSWORD as any,
      providerUserId: username,
      role: USER_ROLE.CUSTOMER as any,
    });
    return {
      access_token,
    };
  }

  async validateUserAuth(
    brand: 'ANGELS_PIZZA' | 'FIGARO_COFFEE',
    providerUserId,
    authMethod: 'PASSWORD' | 'GOOGLE' | 'FACEBOOK',
  ) {
    const userAuth = await this.userAuthRepo.findOne({
      where: {
        authMethod,
        providerUserId,
        user: {
          brand: brand as any,
        },
      },
      relations: {
        user: true,
      },
    });
    return userAuth;
  }
}
