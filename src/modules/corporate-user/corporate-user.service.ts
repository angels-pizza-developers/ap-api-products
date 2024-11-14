import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCorporateUserDto } from "./dto/corporate-user.create.dto";
import { UpdateCorporateUserDto } from "./dto/corporate-user.update.dto";
import { CorporateUserRepository } from "src/database/repositories/corporate-user.repository";
import moment from "moment";
import { hasDuplicates } from "src/shared/utils/array.utils";
import { columnDefToTypeORMCondition } from "src/shared/utils/database.utils";
import { In } from "typeorm";
import { CorporateUser } from "src/database/entities/CorporateUser";
import { User } from "src/database/entities/User";
import { UserAuth } from "src/database/entities/UserAuth";
import { REGISTER_ERROR_EMAIL_USED } from "src/shared/constants/auth-error.constant";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { hash } from "src/shared/utils/hash.utils";
import { Access } from "src/database/entities/Access";

@Injectable()
export class CorporateUserService {
  constructor(
    private corporateUserRepository: CorporateUserRepository,
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.corporateUserRepository.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {
          user: {
            access: true
          },
        },
        skip,
        take,
        order,
      }),
      this.corporateUserRepository.count({
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

  async create(dto: CreateCorporateUserDto) {
    try {
      return this.corporateUserRepository.manager.transaction(
        async (entityManager) => {
          try {
            let userAuth = await entityManager.findOne(UserAuth, {
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
            if (userAuth) {
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

            let user = new User();
            user.role = USER_ROLE.CORPORATE as any;
            user.brand = BRAND_TYPE.ANGELS_PIZZA as any;
            user.isVerified = true;
            
            const access = await entityManager.findOne(Access, {
              where: {
                accessId: dto.accessId
              }
            })
            if(!access) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.NOT_FOUND,
                  message: "Access not found",
                },
                HttpStatus.NOT_FOUND,
              );
            }
            user.access = access;
            user = await entityManager.save(User, user);

            userAuth = new UserAuth();
            userAuth.user = user;
            userAuth.authMethod = AUTH_METHOD.PASSWORD;
            userAuth.providerUserId = dto.email;
            userAuth.isVerified = true;
            userAuth.passwordHash = await hash(dto.password);
            userAuth = await entityManager.save(UserAuth, userAuth);

            let corporateUser = await entityManager.findOne(CorporateUser, {
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
                user: true,
              },
            });
            if (corporateUser) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  error:
                    "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                  message:
                    "This email or mobile number is already registered. Please log in or use a different email to sign up.",
                  errorCode: "REGISTER_ERROR_EMAIL_USED",
                },
                HttpStatus.BAD_REQUEST,
              );
            }
            corporateUser = new CorporateUser();
            corporateUser.name = dto.name;
            corporateUser.email = dto.email;
            corporateUser.mobileNumber = dto.mobileNumber;
            corporateUser.user = user;
            corporateUser.brand = BRAND_TYPE.ANGELS_PIZZA;
            corporateUser = await entityManager.save(corporateUser);

            if (!corporateUser) {
              throw new Error("Error saving access type");
            }
            corporateUser = await entityManager.findOne(CorporateUser, {
              where: {
                corporateUserId: corporateUser?.corporateUserId,
                active: true,
              },
              relations: {
                user: {
                  access: true,
                },
              },
            });
  
            return corporateUser;
          } catch (ex) {
            console.log(ex.message);
            throw new HttpException(
              {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                  ex.message?.includes("duplicate") &&
                  ex.message?.includes("unique")
                    ? "Already exist!"
                    : ex?.message,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        },
      );
    } catch (ex) {
      throw ex;
    }
  }

  async findOne(id: string) {
    const corporateUser = await this.corporateUserRepository.findOne({
      where: {
        corporateUserId: id,
        active: true,
      },
      relations: {
        user: {
          access: true,
        },
      },
    });

    if (!corporateUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return corporateUser;
  }

  async update(id: string, dto: UpdateCorporateUserDto) {
    return this.corporateUserRepository.manager.transaction(
      async (entityManager) => {
        try {
          let corporateUser = await entityManager.findOne(CorporateUser, {
            where: {
              corporateUserId: id,
              active: true,
            },
          });

          if (!corporateUser) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Not found",
              },
              HttpStatus.NOT_FOUND,
            );
          }
          corporateUser.name = dto.name;
          corporateUser.email = dto.email;
          corporateUser.mobileNumber = dto.mobileNumber;
          corporateUser = await entityManager.save(
            CorporateUser,
            corporateUser,
          );

          corporateUser = await entityManager.findOne(CorporateUser, {
            where: {
              corporateUserId: corporateUser?.corporateUserId,
              active: true,
            },
            relations: {
              user: {
                access: true,
              },
            },
          });

          let user = corporateUser.user;
          const access = await entityManager.findOne(Access, {
            where: {
              accessId: dto.accessId
            }
          })
          if(!access) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Access not found",
              },
              HttpStatus.NOT_FOUND,
            );
          }
          user.access = access;
          user = await entityManager.save(
            User,
            user,
          );
          corporateUser.user = user;
          return corporateUser;
        } catch (ex) {
          console.log(ex.message);
          throw new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message:
                ex.message?.includes("duplicate") &&
                ex.message?.includes("unique")
                  ? "Already exist!"
                  : ex?.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      },
    );
  }

  async remove(id: string) {
    try {
      const corporateUser = await this.corporateUserRepository.findOne({
        where: {
          corporateUserId: id,
          active: true,
        },
        relations: {
          user: {
            access: true
          },
        },
      });

      if (!corporateUser) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      corporateUser.active = false;
      return await this.corporateUserRepository.save(corporateUser);
    } catch (ex) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ex.message?.includes("duplicate")
            ? "Already exist!"
            : ex?.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
