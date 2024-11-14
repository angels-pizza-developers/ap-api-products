import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/database/repositories/category.repository";
import { columnDefToTypeORMCondition } from "src/shared/utils/database.utils";
import { Category } from "src/database/entities/Category";
import { CreateCategoryDto } from "./dto/category.create.dto";
import { UpdateCategoryDto } from "./dto/category.update.dto";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import moment from "moment";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.categoryRepository.find({
        where: {
          ...condition,
          active: true,
        },
        skip,
        take,
        order,
      }),
      this.categoryRepository.count({
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

  async create(dto: CreateCategoryDto) {
    try {
      const category = new Category();
      category.categoryCode = dto.categoryCode;
      category.name = dto.name;
      category.description = dto.description;
      category.brand = BRAND_TYPE.ANGELS_PIZZA;
      return await this.categoryRepository.save(category);
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
    const category = await this.categoryRepository.findOne({
      where: {
        categoryId: id,
        active: true,
      },
    });

    if (!category) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          categoryId: id,
          active: true,
        },
      });

      if (!category) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      category.categoryCode = dto.categoryCode;
      category.name = dto.name;
      category.description = dto.description;
      category.updatedAt = moment().utc().toDate();
      return await this.categoryRepository.save(category);
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
      const category = await this.categoryRepository.findOne({
        where: {
          categoryId: id,
          active: true,
        },
      });

      if (!category) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Not found",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      category.active = false;
      return await this.categoryRepository.save(category);
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
