import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class DatabaseEnvConfigValidator {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  DATABASE_LOGGING: boolean;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  DATABASE_MIGRATIONS_RUN: boolean;

  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsOptional()
  @IsNumber()
  @Min(1)
  DATABASE_MAX_CONNECTIONS: number;

  @IsString()
  PGADMIN_PASSWORD: string;
}
