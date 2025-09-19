import { IsString } from 'class-validator';

export class GoogleEnvConfigValidator {
  @IsString()
  GOOGLE_ID: string;

  @IsString()
  GOOGLE_SECRET: string;

  @IsString()
  GOOGLE_CALLBACK_URL: string;
}
