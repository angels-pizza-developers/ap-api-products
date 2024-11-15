import { BaseRepository } from './base.repository';
import { BranchDaysAvailability } from '../entities/BranchDaysAvailability';
import { DataSource } from 'typeorm';
export declare class BranchDaysAvailabilityRepository extends BaseRepository<BranchDaysAvailability> {
    private dataSource;
    constructor(dataSource: DataSource);
}
