import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { MetaConfig } from './types/meta-config.type';
import { MetaEnvConfigValidator } from './validators/meta.config.validators';

export default registerAs<MetaConfig>('meta', () => {
  console.info(`Register JwtConfig from environment variables`);
  validateConfig(process.env, MetaEnvConfigValidator);
  return {
    clientID: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
  };
});
