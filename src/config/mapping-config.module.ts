// src/common/config/mapping-config.module.ts
import { Module } from "@nestjs/common";
import { mappingConfig } from "./mapping-config";

@Module({
  providers: [
    {
      provide: "MAPPING_CONFIG",
      useValue: mappingConfig,
    },
  ],
  exports: ["MAPPING_CONFIG"], // Export so other modules can inject the config
})
export class MappingConfigModule {}
