import * as migrations from '@/infrastructure/database/migrations';
import * as entities from '@/infrastructure/database/pgsql/entities';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederFactoryItem, SeederOptions } from 'typeorm-extension';

import * as seedsModules from './seeds';
import * as factoriesModules from './seeds/factories';

const NODE_ENV = process.env.NODE_ENV;
dotenv.config({ path: `./env/.env.${NODE_ENV}` });

const seeds = Object.values(seedsModules);
const factories: SeederFactoryItem[] = Object.values(
  factoriesModules,
) as SeederFactoryItem[];

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  schema: 'public',
  migrationsTableName: 'migrations',
  entities,
  migrations,
  ssl: {
    rejectUnauthorized: false,
  },
  factories,
  seeds,
};

export const AppDataSource = new DataSource(options);

console.log(
  `\x1b[36m type: "${AppDataSource.options.type}" | host: "${process.env.DATABASE_HOST}" \x1b[0m `,
);
