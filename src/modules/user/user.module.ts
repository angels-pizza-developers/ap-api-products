import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { ProfileCustomerService } from './service/profile-customer.service';
import { ProfileCorporateService } from './service/profile-corporate.service';
import { User } from 'src/database/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileCustomer } from '../../database/entities/ProfileCustomer';
import { ProfileCorporate } from 'src/database/entities/ProfileCorporate';
import { AutoMapperModule } from 'src/common/auto-mapper/auto-mapper.module';

@Module({
  imports: [
    AutoMapperModule,
    TypeOrmModule.forFeature([User, ProfileCustomer, ProfileCorporate]), // Register product entity and repository
  ],
  controllers: [UserController],
  providers: [UserService, ProfileCustomerService, ProfileCorporateService],
  exports: [UserService],
})
export class UserModule {}
