import { IsString } from 'class-validator';

export class WebEnvConfigValidator {
  @IsString()
  WEB_URL: string;
}
