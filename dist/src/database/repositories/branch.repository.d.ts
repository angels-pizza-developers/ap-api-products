import { BaseRepository } from './base.repository';
import { Branch } from '../entities/Branch';
import { DataSource } from 'typeorm';
export declare class BranchRepository extends BaseRepository<Branch> {
    private dataSource;
    constructor(dataSource: DataSource);
}
