
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PaymentOptions } from '../entities/PaymentOptions';
import { DataSource } from 'typeorm';

@Injectable()
export class PaymentOptionsRepository extends BaseRepository<PaymentOptions> {
  constructor(private dataSource: DataSource) {
    super(PaymentOptions, dataSource.createEntityManager());
  }
}
