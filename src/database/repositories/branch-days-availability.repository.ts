
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BranchDaysAvailability } from '../entities/BranchDaysAvailability';
import { DataSource } from 'typeorm';

@Injectable()
export class BranchDaysAvailabilityRepository extends BaseRepository<BranchDaysAvailability> {
  constructor(private dataSource: DataSource) {
    super(BranchDaysAvailability, dataSource.createEntityManager());
  }
}
