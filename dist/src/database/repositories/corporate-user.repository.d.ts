import { BaseRepository } from './base.repository';
import { CorporateUser } from '../entities/CorporateUser';
import { DataSource } from 'typeorm';
export declare class CorporateUserRepository extends BaseRepository<CorporateUser> {
    private dataSource;
    constructor(dataSource: DataSource);
}
