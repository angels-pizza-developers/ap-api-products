
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserAuthTokenLog } from '../entities/UserAuthTokenLog';
import { DataSource } from 'typeorm';

@Injectable()
export class UserAuthTokenLogRepository extends BaseRepository<UserAuthTokenLog> {
  constructor(private dataSource: DataSource) {
    super(UserAuthTokenLog, dataSource.createEntityManager());
  }
}
