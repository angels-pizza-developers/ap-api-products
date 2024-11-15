import { BaseRepository } from './base.repository';
import { BranchUser } from '../entities/BranchUser';
import { DataSource } from 'typeorm';
export declare class BranchUserRepository extends BaseRepository<BranchUser> {
    private dataSource;
    constructor(dataSource: DataSource);
}
