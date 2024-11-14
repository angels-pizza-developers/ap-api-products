
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Cart } from '../entities/Cart';
import { DataSource } from 'typeorm';

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }
}
