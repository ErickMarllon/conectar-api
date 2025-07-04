import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  ssl: { rejectUnauthorized: false },
  seedTracking: true,
  factories: [__dirname + '/factories/**/*{.ts,.js}'],
} as DataSourceOptions & SeederOptions);
