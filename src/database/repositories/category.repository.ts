
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Category } from '../entities/Category';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
