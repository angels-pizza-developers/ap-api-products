import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { join } from "path";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly configService: ConfigService;

  constructor(configService?: ConfigService) {
    this.configService = configService || new ConfigService();
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.getDataSourceOptions(), // Using common options for both cases
      retryAttempts: 3,
      autoLoadEntities: true,
      // other NestJS-specific options if needed
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    const ssl = this.configService.get<string>("SSL");
    const synchronize = this.configService.get<string>("DB_SYNCHRONIZE");
    return {
      type: "postgres",
      host: this.configService.get<string>("DB_HOST"),
      port: Number(this.configService.get<number>("DB_PORT")),
      database: this.configService.get<string>("DB_DATABASE"),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      entities: [join(__dirname, "entities", "*{.ts,.js}")],
      migrations: [join(__dirname, "migrations/*{.ts,.js}")],
      synchronize: synchronize.toLowerCase().includes("true"), // Never use TRUE in production!
      ssl: ssl.toLowerCase().includes("true"),
      extra: ssl.toLowerCase().includes("true")
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    };
  }
}
