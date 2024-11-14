
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ProductOptionType } from '../entities/ProductOptionType';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductOptionTypeRepository extends BaseRepository<ProductOptionType> {
  constructor(private dataSource: DataSource) {
    super(ProductOptionType, dataSource.createEntityManager());
  }
}
