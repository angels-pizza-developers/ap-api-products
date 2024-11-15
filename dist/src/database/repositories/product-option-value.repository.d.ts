import { BaseRepository } from './base.repository';
import { ProductOptionValue } from '../entities/ProductOptionValue';
import { DataSource } from 'typeorm';
export declare class ProductOptionValueRepository extends BaseRepository<ProductOptionValue> {
    private dataSource;
    constructor(dataSource: DataSource);
}
