/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { User } from 'src/database/entities/User';
import { plainToInstance } from 'class-transformer';
import { AutoMapperService } from '../../../common/auto-mapper/auto-mapper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private autoMapperService: AutoMapperService,
  ) {}

  async create(dto: CreateUserDto, entityManager: EntityManager = null) {
    try {
      let user = new User();
      user = this.autoMapperService.map(
        dto,
        User,
        'RegisterCustomerDtoToCreateUserDto',
      );

      // Use the same transaction passed from ServiceA
      if (entityManager) {
        return await entityManager.save(user);
      } else {
        return await this.userRepository.save(user);
      }
    } catch (ex) {
      throw ex;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  findByEmail(email) {
    return this.userRepository.findOneBy({
      username: email,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
