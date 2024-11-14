
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ProductBranch } from '../entities/ProductBranch';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductBranchRepository extends BaseRepository<ProductBranch> {
  constructor(private dataSource: DataSource) {
    super(ProductBranch, dataSource.createEntityManager());
  }
}
