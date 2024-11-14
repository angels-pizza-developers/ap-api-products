
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ProductCategory } from '../entities/ProductCategory';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(private dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }
}
