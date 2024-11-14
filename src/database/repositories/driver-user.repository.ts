
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { DriverUser } from '../entities/DriverUser';
import { DataSource } from 'typeorm';

@Injectable()
export class DriverUserRepository extends BaseRepository<DriverUser> {
  constructor(private dataSource: DataSource) {
    super(DriverUser, dataSource.createEntityManager());
  }
}
