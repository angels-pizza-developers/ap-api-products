import { BaseRepository } from './base.repository';
import { Product } from '../entities/Product';
import { DataSource } from 'typeorm';
export declare class ProductRepository extends BaseRepository<Product> {
    private dataSource;
    constructor(dataSource: DataSource);
}
