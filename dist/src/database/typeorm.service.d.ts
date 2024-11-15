import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
export declare class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private readonly configService;
    constructor(configService?: ConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions;
    getDataSourceOptions(): DataSourceOptions;
}
