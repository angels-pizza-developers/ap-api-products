import { BaseRepository } from './base.repository';
import { CustomerUser } from '../entities/CustomerUser';
import { DataSource } from 'typeorm';
export declare class CustomerUserRepository extends BaseRepository<CustomerUser> {
    private dataSource;
    constructor(dataSource: DataSource);
}
