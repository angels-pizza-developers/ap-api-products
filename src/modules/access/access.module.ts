import { Module } from "@nestjs/common";
import { AccessRepository } from "src/database/repositories/access.repository";
import { AccessController } from "./access.controller";
import { AccessService } from "./access.service";

@Module({
  controllers: [AccessController],
  providers: [
    AccessService,
    AccessRepository,
  ],
  exports: [],
})
export class AccessModule {}
