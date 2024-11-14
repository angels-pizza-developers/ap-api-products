
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserAuthLog } from '../entities/UserAuthLog';
import { DataSource } from 'typeorm';

@Injectable()
export class UserAuthLogRepository extends BaseRepository<UserAuthLog> {
  constructor(private dataSource: DataSource) {
    super(UserAuthLog, dataSource.createEntityManager());
  }
}
