import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { AuthConfig } from './types/auth-config.type';
import { AuthEnvConfigValidator } from './validators/auth.config.validators';

export default registerAs<AuthConfig>('auth', () => {
  console.info(`Register AuthConfig from environment variables`);
  validateConfig(process.env, AuthEnvConfigValidator);

  const salts = process.env.AUTH_SALTS
    ? parseInt(process.env.AUTH_SALTS, 10)
    : 10;
  const inactiveDays = process.env.AUTH_INACTIVE_DAYS
    ? parseInt(process.env.AUTH_INACTIVE_DAYS, 10)
    : 30;
  const maxLoginAttempts = process.env.AUTH_MAX_LOGIN_ATTEMPTS
    ? parseInt(process.env.AUTH_MAX_LOGIN_ATTEMPTS, 10)
    : 5;
  const lockoutDuration = process.env.AUTH_LOCKOUT_DURATION
    ? parseInt(process.env.AUTH_LOCKOUT_DURATION, 10)
    : 900000;
  return {
    salts,
    inactiveDays,
    maxLoginAttempts,
    lockoutDuration,
  };
});
