import { BaseRepository } from './base.repository';
import { UserAuthLog } from '../entities/UserAuthLog';
import { DataSource } from 'typeorm';
export declare class UserAuthLogRepository extends BaseRepository<UserAuthLog> {
    private dataSource;
    constructor(dataSource: DataSource);
}
