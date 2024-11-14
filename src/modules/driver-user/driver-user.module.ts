import { Module } from "@nestjs/common";
import { DriverUserService } from "./driver-user.service";
import { DriverUserController } from "./driver-user.controller";

@Module({
  controllers: [DriverUserController],
  providers: [DriverUserService],
})
export class DriverUserModule {}
