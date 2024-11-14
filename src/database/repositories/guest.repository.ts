
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Guest } from '../entities/Guest';
import { DataSource } from 'typeorm';

@Injectable()
export class GuestRepository extends BaseRepository<Guest> {
  constructor(private dataSource: DataSource) {
    super(Guest, dataSource.createEntityManager());
  }
}
