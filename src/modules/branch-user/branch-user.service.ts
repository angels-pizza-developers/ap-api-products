import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import moment from "moment";
import { BranchUser } from "src/database/entities/BranchUser";
import { User } from "src/database/entities/User";
import { UserAuth } from "src/database/entities/UserAuth";
import { BranchUserRepository } from "src/database/repositories/branch-user.repository";
import { REGISTER_ERROR_EMAIL_USED } from "src/shared/constants/auth-error.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { hasDuplicates } from "src/shared/utils/array.utils";
import { columnDefToTypeORMCondition } from "src/shared/utils/database.utils";
import { CreateBranchUserDto } from "./dto/branch-user.create.dto";
import { UpdateBranchUserDto } from "./dto/branch-user.update.dto";
import { hash } from "src/shared/utils/hash.utils";
import { Branch } from "src/database/entities/Branch";
import { Access } from "src/database/entities/Access";

@Injectable()
export class BranchUserService {
  constructor(
    private branchUserRepository: BranchUserRepository,
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.branchUserRepository.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {
          user: {
            access: true
          },
          branch: true,
        },
        skip,
        take,
        order,
      }),
      this.branchUserRepository.count({
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

  async create(dto: CreateBranchUserDto) {
    try {
      return this.branchUserRepository.manager.transaction(
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
                user: {
                  access: true
                },
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

            let branchUser = await entityManager.findOne(BranchUser, {
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
                user: {
                  access: true
                },
              },
            });
            if (branchUser) {
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

            const branch = await entityManager.findOne(Branch, {
              where: {
                branchId: dto.branchId,
                active: true,
              },
            });
            if (!branch) {
              throw new Error(`Branch Id: ${dto.branchId} not found!`);
            }

            branchUser = new BranchUser();
            branchUser.name = dto.name;
            branchUser.email = dto.email;
            branchUser.mobileNumber = dto.mobileNumber;
            branchUser.user = user;
            branchUser.brand = BRAND_TYPE.ANGELS_PIZZA;
            branchUser.branch = branch;
            branchUser = await entityManager.save(branchUser);

            if (!branchUser) {
              throw new Error("Error saving access type");
            }
            return branchUser;
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
    const branchUser = await this.branchUserRepository.findOne({
      where: {
        branchUserId: id,
        active: true,
      },
      relations: {
        user: {
          access: true
        },
        branch: true,
      },
    });

    if (!branchUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return branchUser;
  }

  async update(id: string, dto: UpdateBranchUserDto) {
    return this.branchUserRepository.manager.transaction(
      async (entityManager) => {
        try {
          let branchUser = await entityManager.findOne(BranchUser, {
            where: {
              branchUserId: id,
              active: true,
            },
          });

          if (!branchUser) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Not found",
              },
              HttpStatus.NOT_FOUND,
            );
          }
          branchUser.name = dto.name;
          branchUser.email = dto.email;
          branchUser.mobileNumber = dto.mobileNumber;
          branchUser = await entityManager.save(BranchUser, branchUser);

          branchUser = await entityManager.findOne(BranchUser, {
            where: {
              branchUserId: branchUser?.branchUserId,
              active: true,
            },
            relations: {
              user: {
                access: true
              },
              branch: true,
            },
          });

          let user = branchUser.user;
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
          branchUser.user = user;

          return branchUser;
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
      const branchUser = await this.branchUserRepository.findOne({
        where: {
          branchUserId: id,
          active: true,
        },
        relations: {
          user: {
            access: true
          },
          branch: true,
        },
      });

      if (!branchUser) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      branchUser.active = false;
      return await this.branchUserRepository.save(branchUser);
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
