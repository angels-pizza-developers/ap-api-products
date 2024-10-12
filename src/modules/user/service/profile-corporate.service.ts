import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ProfileCorporate } from 'src/database/entities/ProfileCorporate';
import { QueryRunner, Repository } from 'typeorm';
import { CreateProfileCorporateDto } from '../dto/create-profile-corporate.dto';
import { User } from 'src/database/entities/User';

@Injectable()
export class ProfileCorporateService {
  constructor(
    @InjectRepository(ProfileCorporate)
    private readonly profileCorporateRepo: Repository<ProfileCorporate>,
  ) {}
  async create(
    dto: CreateProfileCorporateDto,
    queryRunner: QueryRunner = null,
  ) {
    try {
      let profileCorporate = new ProfileCorporate();
      profileCorporate = plainToInstance(ProfileCorporate, dto);

      const user = await this.profileCorporateRepo.manager.findOneBy(User, {
        username: profileCorporate.email,
      });

      if (user) {
        profileCorporate.user = user;

        // Use the same transaction passed from ServiceA
        if (queryRunner) {
          return await queryRunner.manager.save(profileCorporate);
        } else {
          return await this.profileCorporateRepo.save(profileCorporate);
        }
      }
    } catch (ex) {
      throw ex;
    }
  }
}
