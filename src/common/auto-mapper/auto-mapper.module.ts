// src/common/auto-mapper/auto-mapper.module.ts
import { Module } from "@nestjs/common";
import { AutoMapperService } from "./auto-mapper.service";
import { MappingConfigModule } from "src/config/mapping-config.module";

@Module({
  imports: [MappingConfigModule], // Import the mapping config module
  providers: [AutoMapperService],
  exports: [AutoMapperService], // Export the service to be used in other modules
})
export class AutoMapperModule {}
