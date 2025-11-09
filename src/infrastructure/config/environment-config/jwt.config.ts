import { registerAs } from '@nestjs/config';
import { JwtConfig } from '../types/jwt-config.type';
import { JwtEnvConfigValidator } from '../validation/jwt.config.validators';
import validateConfig from './validate-config';

export default registerAs<JwtConfig>('jwt', () => {
  const validated = validateConfig(process.env, JwtEnvConfigValidator);

  return {
    secret: validated.JWT_SECRET,
    expiresIn: validated.JWT_TOKEN_EXPIRES_IN,
    refreshSecret: validated.JWT_REFRESH_SECRET,
    refreshExpiresIn: validated.JWT_REFRESH_TOKEN_EXPIRES_IN,
    forgotSecret: validated.JWT_FORGOT_SECRET,
    forgotExpiresIn: validated.JWT_FORGOT_TOKEN_EXPIRES_IN,
    confirmEmailSecret: validated.JWT_CONFIRM_EMAIL_SECRET,
    confirmEmailExpiresIn: validated.JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN,
  };
});
