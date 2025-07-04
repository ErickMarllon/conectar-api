import { IsNotEmpty, IsString } from 'class-validator';

export class MetaEnvConfigValidator {
  @IsString()
  @IsNotEmpty()
  FACEBOOK_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  FACEBOOK_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  FACEBOOK_CALLBACK_URL: string;
}
