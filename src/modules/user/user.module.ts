import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { UserController } from "./user.controller";
import { User } from "src/database/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "src/common/auto-mapper/auto-mapper.module";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";
import { CorporateUser } from "src/database/entities/CorporateUser";
import { CustomerUser } from "src/database/entities/CustomerUser";
import { UserRepository } from "src/database/repositories/user.repository";

@Module({
  imports: [
    AutoMapperModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
