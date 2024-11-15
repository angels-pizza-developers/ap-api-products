"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
let TypeOrmConfigService = class TypeOrmConfigService {
    constructor(configService) {
        this.configService = configService || new config_1.ConfigService();
    }
    createTypeOrmOptions() {
        return {
            ...this.getDataSourceOptions(),
            retryAttempts: 3,
            autoLoadEntities: true,
        };
    }
    getDataSourceOptions() {
        const ssl = this.configService.get("SSL");
        const synchronize = this.configService.get("DB_SYNCHRONIZE");
        return {
            type: "postgres",
            host: this.configService.get("DB_HOST"),
            port: Number(this.configService.get("DB_PORT")),
            database: this.configService.get("DB_DATABASE"),
            username: this.configService.get("DB_USERNAME"),
            password: this.configService.get("DB_PASSWORD"),
            entities: [(0, path_1.join)(__dirname, "entities", "*{.ts,.js}")],
            migrations: [(0, path_1.join)(__dirname, "migrations/*{.ts,.js}")],
            synchronize: synchronize.toLowerCase().includes("true"),
            ssl: ssl.toLowerCase().includes("true"),
            extra: ssl.toLowerCase().includes("true")
                ? { ssl: { require: true, rejectUnauthorized: false } }
                : {},
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService;
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmConfigService);
//# sourceMappingURL=typeorm.service.js.map