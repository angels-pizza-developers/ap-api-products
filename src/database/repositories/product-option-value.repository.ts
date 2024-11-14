
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ProductOptionValue } from '../entities/ProductOptionValue';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductOptionValueRepository extends BaseRepository<ProductOptionValue> {
  constructor(private dataSource: DataSource) {
    super(ProductOptionValue, dataSource.createEntityManager());
  }
}
