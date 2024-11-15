import { BaseRepository } from './base.repository';
import { User } from '../entities/User';
import { DataSource } from 'typeorm';
export declare class UserRepository extends BaseRepository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
}
