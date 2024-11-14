import { Module } from "@nestjs/common";
import { BranchUserService } from "./branch-user.service";
import { BranchUserController } from "./branch-user.controller";
import { BranchUserRepository } from "src/database/repositories/branch-user.repository";

@Module({
  controllers: [BranchUserController],
  providers: [
    BranchUserService,
    BranchUserRepository,
  ],
})
export class BranchUserModule {}
