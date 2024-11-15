import { BaseRepository } from './base.repository';
import { ProductCategory } from '../entities/ProductCategory';
import { DataSource } from 'typeorm';
export declare class ProductCategoryRepository extends BaseRepository<ProductCategory> {
    private dataSource;
    constructor(dataSource: DataSource);
}
