import { BaseRepository } from './base.repository';
import { Category } from '../entities/Category';
import { DataSource } from 'typeorm';
export declare class CategoryRepository extends BaseRepository<Category> {
    private dataSource;
    constructor(dataSource: DataSource);
}
