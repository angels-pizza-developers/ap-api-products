import { BaseRepository } from './base.repository';
import { Cart } from '../entities/Cart';
import { DataSource } from 'typeorm';
export declare class CartRepository extends BaseRepository<Cart> {
    private dataSource;
    constructor(dataSource: DataSource);
}
