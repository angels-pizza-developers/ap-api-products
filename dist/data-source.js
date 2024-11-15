"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const typeorm_service_1 = require("./src/database/typeorm.service");
const configService = new config_1.ConfigService();
const typeOrmConfigService = new typeorm_service_1.TypeOrmConfigService(configService);
exports.default = new typeorm_1.DataSource(typeOrmConfigService.getDataSourceOptions());
//# sourceMappingURL=data-source.js.map