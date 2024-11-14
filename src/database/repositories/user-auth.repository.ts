
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserAuth } from '../entities/UserAuth';
import { DataSource } from 'typeorm';

@Injectable()
export class UserAuthRepository extends BaseRepository<UserAuth> {
  constructor(private dataSource: DataSource) {
    super(UserAuth, dataSource.createEntityManager());
  }
}
