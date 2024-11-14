/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, QueryRunner, Repository } from "typeorm";
import { User } from "src/database/entities/User";
import { AutoMapperService } from "../../../common/auto-mapper/auto-mapper.service";
import { USER_ERROR_USER_NOT_FOUND } from "src/shared/constants/user.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { CustomerUser } from "src/database/entities/CustomerUser";
import { UserRepository } from "src/database/repositories/user.repository";
import { CorporateUser } from "src/database/entities/CorporateUser";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(userId) {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: USER_ERROR_USER_NOT_FOUND,
            message: USER_ERROR_USER_NOT_FOUND,
            errorCode: "USER_ERROR_USER_NOT_FOUND",
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (user.role === USER_ROLE.CORPORATE) {
        return await this.userRepository.manager.findOne(CorporateUser, {
          where: {
            user: {
              userId,
              role: USER_ROLE.CORPORATE,
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
      } else if (user.role === USER_ROLE.BRANCH) {
        return await this.userRepository.manager.findOne(BranchUser, {
          where: {
            user: {
              userId,
              role: USER_ROLE.BRANCH,
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
      } else if (user.role === USER_ROLE.DRIVER) {
        return await this.userRepository.manager.findOne(DriverUser, {
          where: {
            user: {
              userId,
              role: USER_ROLE.DRIVER,
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
      } else {
        return await this.userRepository.manager.findOne(CustomerUser, {
          where: {
            user: {
              userId,
              role: USER_ROLE.CUSTOMER,
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
    } catch (ex) {
      throw ex;
    }
  }
}
