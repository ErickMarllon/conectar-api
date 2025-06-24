import { IsNotEmpty, IsString } from 'class-validator';

export class JwtEnvConfigValidator {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_FORGOT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_FORGOT_TOKEN_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  JWT_CONFIRM_EMAIL_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: string;
}
