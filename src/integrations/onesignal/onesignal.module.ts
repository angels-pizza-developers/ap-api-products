import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { OnesignalService } from "./onesignal.service";

@Module({
  imports: [ConfigModule],
  providers: [OnesignalService],
  exports: [OnesignalService],
})
export class OnesignalModule {}
