import { BaseRepository } from './base.repository';
import { PaymentOptions } from '../entities/PaymentOptions';
import { DataSource } from 'typeorm';
export declare class PaymentOptionsRepository extends BaseRepository<PaymentOptions> {
    private dataSource;
    constructor(dataSource: DataSource);
}
