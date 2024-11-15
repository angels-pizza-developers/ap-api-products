import { BaseRepository } from './base.repository';
import { ProductOption } from '../entities/ProductOption';
import { DataSource } from 'typeorm';
export declare class ProductOptionRepository extends BaseRepository<ProductOption> {
    private dataSource;
    constructor(dataSource: DataSource);
}
