import "reflect-metadata";
import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { TypeOrmConfigService } from "./src/database/typeorm.service";
import * as path from "path";
import { execSync } from "child_process";
import * as tsNode from "ts-node";

// Initialize ts-node to handle TypeScript files
tsNode.register({
  transpileOnly: true,
  project: path.resolve(__dirname, "tsconfig.json"),
});

// Load the data source
const configService = new ConfigService();
const typeOrmConfigService = new TypeOrmConfigService(configService);
const dataSource = new DataSource(typeOrmConfigService.getDataSourceOptions());

// Define the migration generation command
const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const command = `typeorm migration:generate ./migrations/${migrationName} -d ./data-source.ts`;

// Run the migration generation command with ts-node
try {
  execSync(`npx ts-node ./node_modules/typeorm/cli.js ${command}`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error("Error generating migration:", error);
  process.exit(1);
}
