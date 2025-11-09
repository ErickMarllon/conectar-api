import { registerAs } from '@nestjs/config';
import process from 'node:process';
import { AppConfig } from '../types/app-config.type';
import { AppEnvConfigValidator } from '../validation/app.config.validators';
import { getCorsOrigin } from '../validation/cors.config.validators';
import validateConfig from './validate-config';

export default registerAs<AppConfig>('app', () => {
  const validated = validateConfig(process.env, AppEnvConfigValidator);

  return {
    nodeEnv: validated.NODE_ENV,
    name: validated.APP_NAME,
    url: validated.APP_URL,
    port: validated.APP_PORT,
    apiPrefix: validated.API_PREFIX,
    fallbackLanguage: validated.APP_FALLBACK_LANGUAGE,
    corsOrigin: getCorsOrigin,
  };
});
