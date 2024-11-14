import { Module } from "@nestjs/common";
import { CustomerUserService } from "./customer-user.service";
import { CustomerUserController } from "./customer-user.controller";
import { CustomerUserRepository } from "../../database/repositories/customer-user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerUserRepository])],
  controllers: [CustomerUserController],
  providers: [CustomerUserService],
})
export class CustomerUserModule {}
