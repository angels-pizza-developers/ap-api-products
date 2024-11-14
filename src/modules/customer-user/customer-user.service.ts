import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomerUser } from "src/database/entities/CustomerUser";
import { User } from "src/database/entities/User";
import { UserAuth } from "src/database/entities/UserAuth";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { hash } from "src/shared/utils/hash.utils";
import { Connection } from "typeorm";
import { RegisterCustomerUserDto } from "src/modules/auth/dto/register.dto";
import {
  REGISTER_ERROR_EMAIL_USED,
  REGISTER_ERROR_PASSWORD_EMPTY,
} from "src/shared/constants/auth-error.constant";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { CustomerUserRepository } from "src/database/repositories/customer-user.repository";
import { getFullName } from "src/shared/utils/entity.utils";

@Injectable()
export class CustomerUserService {
  constructor(private readonly customerUserRepo: CustomerUserRepository) {}

  async registerCustomer(
    dto: RegisterCustomerUserDto,
    authMethod: "PASSWORD" | "GOOGLE" | "FACEBOOK",
    connection: Connection = this.customerUserRepo.manager.connection,
  ) {
    try {
      let userAuth = new UserAuth();
      let user = new User();
      let customerUser = new CustomerUser();
      userAuth = await connection.manager.findOne(UserAuth, {
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
      if (
        (userAuth && userAuth.isVerified) ||
        (userAuth && userAuth.user?.isVerified)
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: REGISTER_ERROR_EMAIL_USED,
            message: REGISTER_ERROR_EMAIL_USED,
            errorCode: "REGISTER_ERROR_EMAIL_USED",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!userAuth) {
        user = new User();
        user.role = USER_ROLE.CUSTOMER as any;
        user.brand = BRAND_TYPE.ANGELS_PIZZA as any;
        user.isVerified = false;
        user = await connection.manager.save(User, user);

        userAuth = new UserAuth();
        userAuth.user = user;
        userAuth.authMethod = authMethod;
        userAuth.providerUserId = dto.email;
        userAuth.isVerified = false;
        userAuth.passwordHash = await hash(dto.password);
        if (
          authMethod === "PASSWORD" &&
          (!dto.password || dto.password === "")
        ) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              error: "Password is required",
              message: REGISTER_ERROR_PASSWORD_EMPTY,
              errorCode: "REGISTER_ERROR_PASSWORD_EMPTY",
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        userAuth = await connection.manager.save(UserAuth, userAuth);
        customerUser = new CustomerUser();
        customerUser.user = user;
      } else {
        customerUser = await connection.manager.findOne(CustomerUser, {
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
        customerUser = new CustomerUser();
        customerUser.user = user;
      }
      customerUser.brand = BRAND_TYPE.ANGELS_PIZZA as any;
      customerUser.firstName = dto.firstName;
      customerUser.middleName = dto.middleName;
      customerUser.lastName = dto.lastName;
      customerUser.fullName = getFullName(
        dto.firstName,
        dto.middleName,
        dto.lastName,
      );
      if (authMethod === AUTH_METHOD.PASSWORD.toString()) {
        customerUser.email = dto.email;
        customerUser.mobileNumber = dto.mobileDetails.mobileNumber;
        customerUser.mobileCountryCode = dto.mobileDetails.mobileCountryCode;
      }
      customerUser = await connection.manager.save(CustomerUser, customerUser);
      customerUser = await connection.manager.findOne(CustomerUser, {
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
    } catch (ex) {
      throw ex;
    }
  }
}
