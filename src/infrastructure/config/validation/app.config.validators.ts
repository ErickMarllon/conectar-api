import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Environment } from '../types/environments.enum';

export class AppEnvConfigValidator {
  @IsEnum(Environment)
  @IsString()
  NODE_ENV: Environment;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  APP_HOST: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  APP_URL: string;

  @Transform(({ value }) => parseInt(value as string, 10))
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsBoolean()
  @IsOptional()
  APP_DEBUG: boolean;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((origin) => origin.trim())
      : value,
  )
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  APP_CORS_ORIGIN: string[];
}
