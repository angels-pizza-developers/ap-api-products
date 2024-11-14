import { Module } from "@nestjs/common";
import { CorporateUserService } from "./corporate-user.service";
import { CorporateUserController } from "./corporate-user.controller";
import { CorporateUserRepository } from "../../database/repositories/corporate-user.repository";

@Module({
  controllers: [CorporateUserController],
  providers: [
    CorporateUserService,
    CorporateUserRepository,
  ],
})
export class CorporateUserModule {}
