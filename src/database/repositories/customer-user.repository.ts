
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CustomerUser } from '../entities/CustomerUser';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerUserRepository extends BaseRepository<CustomerUser> {
  constructor(private dataSource: DataSource) {
    super(CustomerUser, dataSource.createEntityManager());
  }
}
