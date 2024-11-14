
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BranchUser } from '../entities/BranchUser';
import { DataSource } from 'typeorm';

@Injectable()
export class BranchUserRepository extends BaseRepository<BranchUser> {
  constructor(private dataSource: DataSource) {
    super(BranchUser, dataSource.createEntityManager());
  }
}
