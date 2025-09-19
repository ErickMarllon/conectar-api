import { IsString } from 'class-validator';

export class AwsEnvConfigValidator {
  @IsString()
  FILE_AWS_DEFAULT_REGION: string;

  @IsString()
  FILE_AWS_ACCESS_KEY_ID: string;

  @IsString()
  FILE_AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  FILE_AWS_BUCKET: string;
}
