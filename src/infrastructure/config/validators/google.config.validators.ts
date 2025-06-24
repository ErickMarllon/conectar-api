import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleEnvConfigValidator {
  @IsString()
  @IsNotEmpty()
  GOOGLE_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_SECRET: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CALLBACK_URL: string;
}
