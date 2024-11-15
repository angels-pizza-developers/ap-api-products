import { BaseRepository } from './base.repository';
import { Guest } from '../entities/Guest';
import { DataSource } from 'typeorm';
export declare class GuestRepository extends BaseRepository<Guest> {
    private dataSource;
    constructor(dataSource: DataSource);
}
