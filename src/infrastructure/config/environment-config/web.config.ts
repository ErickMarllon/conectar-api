import { registerAs } from '@nestjs/config';
import { WebConfig } from '../types/web-config.type';
import { WebEnvConfigValidator } from '../validation/web.config.validators';
import validateConfig from './validate-config';

export default registerAs<WebConfig>('web', () => {
  console.info(`Register GoogleConfig from environment variables`);
  const validated = validateConfig(process.env, WebEnvConfigValidator);

  return {
    webUrl: validated.WEB_URL,
  };
});
