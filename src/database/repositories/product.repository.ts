
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Product } from '../entities/Product';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
}
