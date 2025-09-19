import { registerAs } from '@nestjs/config';
import { MetaConfig } from '../types/meta-config.type';
import { MetaEnvConfigValidator } from '../validation/meta.config.validators';
import validateConfig from './validate-config';

export default registerAs<MetaConfig>('meta', () => {
  console.info(`Register JwtConfig from environment variables`);
  const validated = validateConfig(process.env, MetaEnvConfigValidator);

  return {
    clientID: validated.FACEBOOK_CLIENT_ID,
    clientSecret: validated.FACEBOOK_CLIENT_SECRET,
    callbackURL: validated.FACEBOOK_CALLBACK_URL,
  };
});
