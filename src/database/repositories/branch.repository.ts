
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Branch } from '../entities/Branch';
import { DataSource } from 'typeorm';

@Injectable()
export class BranchRepository extends BaseRepository<Branch> {
  constructor(private dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager());
  }
}
