import { Module } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { BranchController } from "./branch.controller";
import { BranchRepository } from "src/database/repositories/branch.repository";

@Module({
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
})
export class BranchModule {}
