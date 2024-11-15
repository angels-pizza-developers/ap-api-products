import { BaseRepository } from './base.repository';
import { Order } from '../entities/Order';
import { DataSource } from 'typeorm';
export declare class OrderRepository extends BaseRepository<Order> {
    private dataSource;
    constructor(dataSource: DataSource);
}
