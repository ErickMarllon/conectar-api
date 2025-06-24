import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { GoogleConfig } from './types/google-config.type';
import { GoogleEnvConfigValidator } from './validators/google.config.validators';

export default registerAs<GoogleConfig>('google', () => {
  console.info(`Register JwtConfig from environment variables`);
  validateConfig(process.env, GoogleEnvConfigValidator);
  return {
    clientID: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
  };
});
