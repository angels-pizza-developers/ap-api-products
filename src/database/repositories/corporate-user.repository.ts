
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CorporateUser } from '../entities/CorporateUser';
import { DataSource } from 'typeorm';

@Injectable()
export class CorporateUserRepository extends BaseRepository<CorporateUser> {
  constructor(private dataSource: DataSource) {
    super(CorporateUser, dataSource.createEntityManager());
  }
}
