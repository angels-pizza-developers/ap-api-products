import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository, EntityManager } from 'typeorm';
import { ProfileCustomer } from 'src/database/entities/ProfileCustomer';
import { CreateProfileCustomerDto } from '../dto/create-profile-customer.dto';
import { User } from 'src/database/entities/User';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';

@Injectable()
export class ProfileCustomerService {
  constructor(
    @InjectRepository(ProfileCustomer)
    private readonly profileCustomerRepo: Repository<ProfileCustomer>,
  ) {}
  async create(
    dto: CreateProfileCustomerDto,
    entityManager: EntityManager = null,
  ) {
    try {
      let profileCustomer = new ProfileCustomer();
      profileCustomer = plainToInstance(ProfileCustomer, dto);
      // Use the same transaction passed from ServiceA
      if (entityManager) {
        const user = await entityManager.findOneBy(User, {
          username: dto['username'],
          role: USER_ROLE.CUSTOMER as any,
        });
        if (user) {
          profileCustomer.user = user;
        } else {
          new Error('Error saving customer profile');
        }
        return entityManager.save(ProfileCustomer, profileCustomer);
      } else {
        const user = await entityManager.findOneBy(User, {
          username: profileCustomer.email,
        });
        if (user) {
          profileCustomer.user = user;
        } else {
          new Error('Error saving customer profile');
        }
        return this.profileCustomerRepo.save(profileCustomer);
      }
    } catch (ex) {
      throw ex;
    }
  }
}
