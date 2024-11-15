import { BaseRepository } from './base.repository';
import { DriverUser } from '../entities/DriverUser';
import { DataSource } from 'typeorm';
export declare class DriverUserRepository extends BaseRepository<DriverUser> {
    private dataSource;
    constructor(dataSource: DataSource);
}
