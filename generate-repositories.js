const fs = require("fs");
const path = require("path");
// Check if the script is running in production
if (process.env.NODE_ENV === "production") {
  console.error(
    "Error: Repository generation is not allowed in production environment.",
  );
  process.exit(1); // Exit the script with an error code
}

const entitiesDir = path.join(__dirname, "src", "database", "entities");
const repositoriesDir = path.join(__dirname, "src", "database", "repositories");

// Ensure the repositories directory exists
if (!fs.existsSync(repositoriesDir)) {
  fs.mkdirSync(repositoriesDir, { recursive: true });
}

console.log("Clearing existing repository files.");
// Delete all existing files in the repositories directory
fs.readdirSync(repositoriesDir).forEach((file) => {
  fs.unlinkSync(path.join(repositoriesDir, file));
});
console.log("Cleared existing repository files.");

// Helper function to convert PascalCase or camelCase to kebab-case
const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between camelCase words
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Handle cases like "APIUser" -> "api-user"
    .toLowerCase();
};

// Function to generate repository content
const createRepositoryContent = (entityName) => `
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ${entityName} } from '../entities/${entityName}';
import { DataSource } from 'typeorm';

@Injectable()
export class ${entityName}Repository extends BaseRepository<${entityName}> {
  constructor(private dataSource: DataSource) {
    super(${entityName}, dataSource.createEntityManager());
  }
}
`;

// Function to generate BaseRepository content with strict `where` checks
const createBaseRepositoryContent = () => `
import { Repository, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class BaseRepository<T> extends Repository<T> {
  async find(options?: FindManyOptions<T>): Promise<T[]> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for all find operations.');
    }
    return super.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for findOne operations.');
    }
    return super.findOne(options);
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    if (!where) {
      throw new BadRequestException('A "where" condition is required for findOneBy operations.');
    }
    return super.findOneBy(where);
  }

  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    if (!options || !options.where) {
      throw new BadRequestException('A "where" condition is required for findAndCount operations.');
    }
    return super.findAndCount(options);
  }

  // You can continue adding overrides for other methods as needed
}
`;

// Create the BaseRepository file if it doesn't exist
const baseRepositoryPath = path.join(repositoriesDir, "base.repository.ts");
if (!fs.existsSync(baseRepositoryPath)) {
  fs.writeFileSync(baseRepositoryPath, createBaseRepositoryContent());
  console.log("Generated base.repository.ts");
} else {
  console.log("base.repository.ts already exists");
}

// Read all entity files from the entities directory
const entities = fs
  .readdirSync(entitiesDir)
  .filter((file) => file.endsWith(".ts"));

// Generate a repository file for each entity
entities.forEach((entityFile) => {
  const entityName = path.parse(entityFile).name; // Get the entity name without extension
  const repositoryContent = createRepositoryContent(entityName);

  // Convert the entity name to kebab-case for the repository file name
  const repositoryFileName = `${toKebabCase(entityName)}.repository.ts`;
  const repositoryFilePath = path.join(repositoriesDir, repositoryFileName);

  // Write the repository content to a new file
  fs.writeFileSync(repositoryFilePath, repositoryContent);
  console.log(`Generated repository for ${entityName}: ${repositoryFileName}`);
});

console.log("All repository files have been generated successfully.");
