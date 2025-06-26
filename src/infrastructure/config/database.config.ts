import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './types/database-config.type';
import { DatabaseEnvConfigValidator } from './validators/database.config.validators';

export default registerAs<DatabaseConfig>('database', () => {
  console.info(`Register DatabaseConfig from environment variables`);
  const DATABASE = validateConfig<DatabaseEnvConfigValidator>(
    process.env,
    DatabaseEnvConfigValidator,
  );

  return {
    url: DATABASE.DATABASE_URL,
    name: DATABASE.DATABASE_NAME,
    user: DATABASE.DATABASE_USER,
    password: DATABASE.DATABASE_PASSWORD,
    adminPassword: DATABASE.PGADMIN_PASSWORD,
    logging: DATABASE.DATABASE_LOGGING === true,
    migrationsRun: DATABASE.DATABASE_MIGRATIONS_RUN === true,
    synchronize: DATABASE.DATABASE_SYNCHRONIZE === true,
    maxConnections: DATABASE.DATABASE_MAX_CONNECTIONS,
  };
});
