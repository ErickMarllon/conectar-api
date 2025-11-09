import * as migrations from '@/infrastructure/database/migrations';
import * as entities from '@/infrastructure/database/pgsql/entities';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederFactoryItem, SeederOptions } from 'typeorm-extension';
import * as seedsModules from './seeds';
import * as factoriesModules from './seeds/factories';

const seeds = Object.values(seedsModules);
const factories: SeederFactoryItem[] = Object.values(
  factoriesModules,
) as SeederFactoryItem[];

dotenv.config({
  path: [`env/.env.${process.env.NODE_ENV}`, 'env/.env', '.env'],
});

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  schema: 'public',
  migrationsTableName: 'migrations',
  entities,
  migrations,
  ssl: {
    rejectUnauthorized: true,
  },
  factories,
  seeds,
};

export const AppDataSource = new DataSource(options);
