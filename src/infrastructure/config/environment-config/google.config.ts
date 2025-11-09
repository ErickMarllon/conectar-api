import { registerAs } from '@nestjs/config';
import { GoogleConfig } from '../types/google-config.type';
import { GoogleEnvConfigValidator } from '../validation/google.config.validators';
import validateConfig from './validate-config';

export default registerAs<GoogleConfig>('google', () => {
  const validated = validateConfig(process.env, GoogleEnvConfigValidator);

  return {
    clientID: validated.GOOGLE_ID,
    clientSecret: validated.GOOGLE_SECRET,
    callbackURL: validated.GOOGLE_CALLBACK_URL,
  };
});
