
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CustomerAddress } from '../entities/CustomerAddress';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerAddressRepository extends BaseRepository<CustomerAddress> {
  constructor(private dataSource: DataSource) {
    super(CustomerAddress, dataSource.createEntityManager());
  }
}
