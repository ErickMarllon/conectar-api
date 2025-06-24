import { Environment } from '@/shared/enums/app.enum';
import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import process from 'node:process';
import { AppConfig } from './types/app-config.type';
import { getCorsOrigin } from './utils/cors.config';
import { AppEnvConfigValidator } from './validators/app.config.validators';

export default registerAs<AppConfig>('app', () => {
  console.info(`Register AppConfig from environment variables`);
  validateConfig(process.env, AppEnvConfigValidator);

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000;

  return {
    nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
    name: process.env.APP_NAME || 'app',
    url: process.env.APP_URL || `http://localhost:${port}`,
    port,
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    corsOrigin: getCorsOrigin(),
  };
});
