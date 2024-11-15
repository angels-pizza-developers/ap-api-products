import { BaseRepository } from './base.repository';
import { UserAuthTokenLog } from '../entities/UserAuthTokenLog';
import { DataSource } from 'typeorm';
export declare class UserAuthTokenLogRepository extends BaseRepository<UserAuthTokenLog> {
    private dataSource;
    constructor(dataSource: DataSource);
}
