
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ProductOption } from '../entities/ProductOption';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductOptionRepository extends BaseRepository<ProductOption> {
  constructor(private dataSource: DataSource) {
    super(ProductOption, dataSource.createEntityManager());
  }
}
