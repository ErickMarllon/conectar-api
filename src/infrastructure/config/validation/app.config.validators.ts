import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class AppEnvConfigValidator {
  @IsString()
  @IsOptional()
  NODE_ENV: string;

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

  @Transform(({ value }: { value: string }) => {
    const newValue = value.split(',').map((origin) => origin.trim());
    return newValue ? newValue : value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  APP_CORS_ORIGIN: string[];
}
