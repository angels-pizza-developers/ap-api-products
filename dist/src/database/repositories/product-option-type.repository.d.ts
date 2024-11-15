import { BaseRepository } from './base.repository';
import { ProductOptionType } from '../entities/ProductOptionType';
import { DataSource } from 'typeorm';
export declare class ProductOptionTypeRepository extends BaseRepository<ProductOptionType> {
    private dataSource;
    constructor(dataSource: DataSource);
}
