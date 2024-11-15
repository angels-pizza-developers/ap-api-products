import { MappingConfig } from "./mapping-config.interface";
export declare class AutoMapperService {
    private readonly mappingConfig;
    constructor(mappingConfig: {
        [key: string]: MappingConfig;
    });
    map<T, U>(source: T, targetClass: new () => U, mappingKey: string): U;
}
