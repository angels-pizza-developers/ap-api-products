import { BaseRepository } from './base.repository';
import { UserAuth } from '../entities/UserAuth';
import { DataSource } from 'typeorm';
export declare class UserAuthRepository extends BaseRepository<UserAuth> {
    private dataSource;
    constructor(dataSource: DataSource);
}
