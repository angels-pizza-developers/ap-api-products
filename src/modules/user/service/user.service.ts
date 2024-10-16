/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { User } from 'src/database/entities/User';
import { AutoMapperService } from '../../../common/auto-mapper/auto-mapper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private autoMapperService: AutoMapperService,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findByUsername(username) {
    return this.userRepo.findOneBy({
    });
  }

  findOne(userId) {
    return this.userRepo.findOne({
      where: {
        userId
      }
    });
  }
}
