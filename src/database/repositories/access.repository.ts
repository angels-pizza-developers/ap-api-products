
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Access } from '../entities/Access';
import { DataSource } from 'typeorm';

@Injectable()
export class AccessRepository extends BaseRepository<Access> {
  constructor(private dataSource: DataSource) {
    super(Access, dataSource.createEntityManager());
  }
}
