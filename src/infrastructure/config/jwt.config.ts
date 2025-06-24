import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { JwtConfig } from './types/jwt-config.type';
import { JwtEnvConfigValidator } from './validators/jwt.config.validators';

export default registerAs<JwtConfig>('jwt', () => {
  console.info(`Register JwtConfig from environment variables`);
  const JWT = validateConfig<JwtEnvConfigValidator>(
    process.env,
    JwtEnvConfigValidator,
  );
  return {
    secret: JWT.JWT_SECRET,
    expiresIn: JWT.JWT_TOKEN_EXPIRES_IN,
    refreshSecret: JWT.JWT_REFRESH_SECRET,
    refreshExpiresIn: JWT.JWT_REFRESH_TOKEN_EXPIRES_IN,
    forgotSecret: JWT.JWT_FORGOT_SECRET,
    forgotExpiresIn: JWT.JWT_FORGOT_TOKEN_EXPIRES_IN,
    confirmEmailSecret: JWT.JWT_CONFIRM_EMAIL_SECRET,
    confirmEmailExpiresIn: JWT.JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN,
  };
});
