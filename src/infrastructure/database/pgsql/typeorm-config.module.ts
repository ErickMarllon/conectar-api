import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config';
import { DatabaseConfig } from '@/infrastructure/config/types/database-config.type';
import * as migrations from '@/infrastructure/database/migrations';
import * as entities from '@/infrastructure/database/pgsql/entities';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (configService: ConfigService): any => {
  const dbConfig = configService.getOrThrow<DatabaseConfig>('database');
  const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: dbConfig.url,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db_name,
    synchronize: false,
    logging: false,
    ssl: {
      rejectUnauthorized: true,
    },
    schema: 'public',
    migrationsTableName: 'migrations',
    entities,
    migrations,
  };
  return typeOrmConfig;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
