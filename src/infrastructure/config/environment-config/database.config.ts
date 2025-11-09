import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DatabaseConfig } from '../types/database-config.type';
import { DatabaseEnvConfigValidator } from '../validation/database.config.validators';
import validateConfig from './validate-config';

export const databaseConfig = () => {
  dotenv.config({
    path: [`env/.env.${process.env.NODE_ENV}`, 'env/.env', '.env'],
  });

  const DATABASE = validateConfig<DatabaseEnvConfigValidator>(
    process.env,
    DatabaseEnvConfigValidator,
  );

  return {
    url: DATABASE.DATABASE_URL,
    db_name: DATABASE.DATABASE_NAME,
    user: DATABASE.DATABASE_USER,
    port: DATABASE.DATABASE_PORT,
    host: DATABASE.DATABASE_HOST,
    password: DATABASE.DATABASE_PASSWORD,
    adminPassword: DATABASE.PGADMIN_PASSWORD,
    logging: DATABASE.DATABASE_LOGGING === true,
    migrationsRun: DATABASE.DATABASE_MIGRATIONS_RUN === true,
    synchronize: DATABASE.DATABASE_SYNCHRONIZE === true,
    maxConnections: DATABASE.DATABASE_MAX_CONNECTIONS,
  };
};

export default registerAs<DatabaseConfig>('database', () => {
  return databaseConfig();
});
