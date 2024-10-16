import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoMapperModule } from 'src/common/auto-mapper/auto-mapper.module';
import { BranchUser } from 'src/database/entities/BranchUser';
import { DriverUser } from 'src/database/entities/DriverUser';
import { CorporateUser } from 'src/database/entities/CorporateUser';
import { CustomerUser } from 'src/database/entities/CustomerUser';
import { CustomerUserService } from './service/customer-user.service';

@Module({
  imports: [
    AutoMapperModule,
    TypeOrmModule.forFeature([
      User,
      CustomerUser,
      CorporateUser,
      BranchUser,
      DriverUser,
    ]), // Register product entity and repository
  ],
  controllers: [UserController],
  providers: [UserService, CustomerUserService],
  exports: [UserService],
})
export class UserModule {}
