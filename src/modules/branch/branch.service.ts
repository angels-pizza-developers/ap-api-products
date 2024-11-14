import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import moment from "moment";
import { Branch } from "src/database/entities/Branch";
import { BranchRepository } from "src/database/repositories/branch.repository";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { columnDefToTypeORMCondition } from "src/shared/utils/database.utils";
import { CreateBranchDto } from "./dto/branch.create.dto";
import { UpdateBranchDto } from "./dto/branch.update.dto";

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}
  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.branchRepository.find({
        where: {
          ...condition,
          active: true,
        },
        skip,
        take,
        order,
      }),
      this.branchRepository.count({
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

  async create(dto: CreateBranchDto) {
    try {
      const branch = new Branch();
      branch.branchCode = dto.branchCode;
      branch.name = dto.name;
      branch.description = dto.description;
      branch.brand = BRAND_TYPE.ANGELS_PIZZA;
      branch.address = dto.address;
      // branch.province = dto.province;
      // branch.city = dto.city;
      // branch.phone = dto.phone;
      // branch.locationCoordinates = dto.locationCoordinates;
      // branch.disposition = dto.disposition;
      // branch.paymentMethodIds = dto.paymentMethodIds;
      // branch.minOrderValue = dto.minOrderValue;
      // branch.maxOrderValue = dto.maxOrderValue;
      // branch.opensAt = dto.opensAt;
      // branch.closesAt = dto.closesAt;
      return await this.branchRepository.save(branch);
    } catch (ex) {
      console.log(ex.message);
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

  async findOne(id: string) {
    const branch = await this.branchRepository.findOne({
      where: {
        branchId: id,
        active: true,
      },
    });

    if (!branch) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return branch;
  }

  async update(id: string, dto: UpdateBranchDto) {
    try {
      const branch = await this.branchRepository.findOne({
        where: {
          branchId: id,
          active: true,
        },
      });

      if (!branch) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      branch.branchCode = dto.branchCode;
      branch.name = dto.name;
      branch.description = dto.description;
      branch.address = dto.address;
      // branch.province = dto.province;
      // branch.city = dto.city;
      // branch.phone = dto.phone;
      // branch.locationCoordinates = dto.locationCoordinates;
      // branch.disposition = dto.disposition;
      // branch.paymentMethodIds = dto.paymentMethodIds;
      // branch.minOrderValue = dto.minOrderValue;
      // branch.maxOrderValue = dto.maxOrderValue;
      // branch.opensAt = dto.opensAt;
      // branch.closesAt = dto.closesAt;
      branch.updatedAt = moment().utc().toDate();
      return await this.branchRepository.save(branch);
    } catch (ex) {
      console.log(ex.message);
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

  async remove(id: string) {
    try {
      const branch = await this.branchRepository.findOne({
        where: {
          branchId: id,
          active: true,
        },
      });

      if (!branch) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      branch.active = false;
      return await this.branchRepository.save(branch);
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
