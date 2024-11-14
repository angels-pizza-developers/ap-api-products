
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Order } from '../entities/Order';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
