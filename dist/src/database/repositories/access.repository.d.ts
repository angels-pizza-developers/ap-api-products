import { BaseRepository } from './base.repository';
import { Access } from '../entities/Access';
import { DataSource } from 'typeorm';
export declare class AccessRepository extends BaseRepository<Access> {
    private dataSource;
    constructor(dataSource: DataSource);
}
