import { registerAs } from '@nestjs/config';
import { AwsConfig } from '../types/aws-config.type';
import { AwsEnvConfigValidator } from '../validation/aws.config.validators';
import validateConfig from './validate-config';

export default registerAs<AwsConfig>('aws', () => {
  console.info(`Register GoogleConfig from environment variables`);
  const validated = validateConfig(process.env, AwsEnvConfigValidator);

  return {
    region: validated.FILE_AWS_DEFAULT_REGION,
    accessKeyId: validated.FILE_AWS_ACCESS_KEY_ID,
    secretAccessKey: validated.FILE_AWS_SECRET_ACCESS_KEY,
    bucket: validated.FILE_AWS_BUCKET,
  };
});
