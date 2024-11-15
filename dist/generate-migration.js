"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const typeorm_service_1 = require("./src/database/typeorm.service");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const tsNode = __importStar(require("ts-node"));
tsNode.register({
    transpileOnly: true,
    project: path.resolve(__dirname, "tsconfig.json"),
});
const configService = new config_1.ConfigService();
const typeOrmConfigService = new typeorm_service_1.TypeOrmConfigService(configService);
const dataSource = new typeorm_1.DataSource(typeOrmConfigService.getDataSourceOptions());
const migrationName = process.argv[2];
if (!migrationName) {
    console.error("Please provide a migration name.");
    process.exit(1);
}
const command = `typeorm migration:generate ./migrations/${migrationName} -d ./data-source.ts`;
try {
    (0, child_process_1.execSync)(`npx ts-node ./node_modules/typeorm/cli.js ${command}`, {
        stdio: "inherit",
    });
}
catch (error) {
    console.error("Error generating migration:", error);
    process.exit(1);
}
//# sourceMappingURL=generate-migration.js.map