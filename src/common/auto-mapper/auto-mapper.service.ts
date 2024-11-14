// src/common/auto-mapper/auto-mapper.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { plainToInstance, instanceToPlain } from "class-transformer";
import { MappingConfig } from "./mapping-config.interface";

@Injectable()
export class AutoMapperService {
  constructor(
    @Inject("MAPPING_CONFIG")
    private readonly mappingConfig: { [key: string]: MappingConfig },
  ) {}

  /**
   * Maps fields from source to target class.
   * - Automatically maps fields that share the same name.
   * - Applies custom mappings for fields defined in the mapping configuration.
   *
   * @param source The source object (e.g., an entity)
   * @param targetClass The target class (e.g., a DTO)
   * @param mappingKey The key to look up custom mappings in the mappingConfig
   */
  map<T, U>(source: T, targetClass: new () => U, mappingKey: string): U {
    // Convert the source instance to a plain object
    const plainObject = instanceToPlain(source);

    // Automatically map fields with the same names
    const targetInstance = plainToInstance(targetClass, plainObject);

    // Fetch custom mapping configuration
    const customConfig = this.mappingConfig[mappingKey];

    // Apply custom mappings if there are any defined
    if (customConfig) {
      for (const [targetKey, mapFunction] of Object.entries(customConfig)) {
        // Apply the custom mapping function for fields that need it
        targetInstance[targetKey] = mapFunction(
          plainObject[targetKey], // The source value
          plainObject, // The entire source object
        );
      }
    }

    return targetInstance;
  }
}
