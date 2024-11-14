import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { TypeOrmConfigService } from "./src/database/typeorm.service";

const configService = new ConfigService();
const typeOrmConfigService = new TypeOrmConfigService(configService);

export default new DataSource(typeOrmConfigService.getDataSourceOptions());
