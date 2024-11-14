
import { Repository, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class BaseRepository<T> extends Repository<T> {
  async find(options?: FindManyOptions<T>): Promise<T[]> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for all find operations.');
    }
    return super.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for findOne operations.');
    }
    return super.findOne(options);
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    if (!where) {
      throw new BadRequestException('A "where" condition is required for findOneBy operations.');
    }
    return super.findOneBy(where);
  }

  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for findAndCount operations.');
    }
    return super.findAndCount(options);
  }

  // You can continue adding overrides for other methods as needed
}
