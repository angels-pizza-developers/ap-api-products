import { BaseRepository } from './base.repository';
import { ProductBranch } from '../entities/ProductBranch';
import { DataSource } from 'typeorm';
export declare class ProductBranchRepository extends BaseRepository<ProductBranch> {
    private dataSource;
    constructor(dataSource: DataSource);
}
