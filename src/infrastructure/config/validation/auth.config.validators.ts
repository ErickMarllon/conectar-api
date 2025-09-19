import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class AuthEnvConfigValidator {
  @IsInt()
  @Min(0)
  @IsOptional()
  AUTH_SALTS: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  AUTH_INACTIVE_DAYS: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  AUTH_MAX_LOGIN_ATTEMPTS: number;

  @IsInt()
  @Min(0)
  @Max(900001)
  @IsOptional()
  AUTH_LOCKOUT_DURATION: number;
}
