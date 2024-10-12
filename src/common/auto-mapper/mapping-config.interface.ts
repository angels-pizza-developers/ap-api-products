export interface MappingConfig {
  [key: string]: (sourceValue: any, sourceObject: any) => any;
}
