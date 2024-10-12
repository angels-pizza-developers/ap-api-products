import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres', // Database type (PostgreSQL in this example)
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'nestjsdb',
  synchronize: process.env.DB_SYNCHRONIZE, // Use migrations in production
  ssl: process.env.SSL, // Use migrations in production
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: true, // Automatically load entities in TypeORM
}));
