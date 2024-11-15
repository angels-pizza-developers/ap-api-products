import { BaseRepository } from './base.repository';
import { CustomerAddress } from '../entities/CustomerAddress';
import { DataSource } from 'typeorm';
export declare class CustomerAddressRepository extends BaseRepository<CustomerAddress> {
    private dataSource;
    constructor(dataSource: DataSource);
}
