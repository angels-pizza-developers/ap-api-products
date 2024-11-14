
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { User } from '../entities/User';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
