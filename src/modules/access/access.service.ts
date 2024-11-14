import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAccessDto } from "./dto/access.create.dto";
import { Access } from "src/database/entities/Access";
import { UpdateAccessDto } from "./dto/access.update.dto";
import { columnDefToTypeORMCondition } from "src/shared/utils/database.utils";
import * as fs from "fs";
import { join } from "path";
import { hasDuplicates } from "src/shared/utils/array.utils";
import { In } from "typeorm";
import moment from "moment";
import { AccessRepository } from "src/database/repositories/access.repository";

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
  ) {
  }

  async getAccessPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.accessRepository.find({
        where: {
          ...condition,
          active: true,
        },
        skip,
        take,
        order,
      }),
      this.accessRepository.count({
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

  async findOne(accessId) {
    const result = await this.accessRepository.findOne({
      select: {
        name: true,
        accessPages: true,
      } as any,
      where: {
        accessId,
        active: true,
      },
    });
    if (!result) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async create(dto: CreateAccessDto) {
    return await this.accessRepository.manager.transaction(async (entityManager) => {
      let access = new Access();
      access.name = dto.name;
      access.accessPages = dto.accessPages;
      access = await entityManager.save(access);
      return await entityManager.save(Access, access);
    });
  }

  async update(accessId, dto: UpdateAccessDto) {
    return await this.accessRepository.manager.transaction(async (entityManager) => {
      const access = await entityManager.findOne(Access, {
        where: {
          accessId,
          active: true,
        },
      });
      if (!access) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      access.name = dto.name;
      access.accessPages = dto.accessPages;
      return await entityManager.save(Access, access);
    });
  }

  async remove(accessId) {
    return await this.accessRepository.manager.transaction(async (entityManager) => {
      const access = await entityManager.findOne(Access, {
        where: {
          accessId,
          active: true,
        },
      });
      if (!access) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      access.active = false;
      return await entityManager.save(Access, access);
    });
  }
}
