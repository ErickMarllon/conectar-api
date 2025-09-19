import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import awsConfig from './aws.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';
import jwtConfig from './jwt.config';
import metaConfig from './meta.config';
import webConfig from './web.config';

const envFile = process.env.NODE_ENV
  ? `env/.env.${process.env.NODE_ENV}`
  : 'env/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envFile],
      load: [
        appConfig,
        databaseConfig,
        googleConfig,
        jwtConfig,
        metaConfig,
        webConfig,
        awsConfig,
      ],
    }),
  ],
  exports: [ConfigModule],
})
export class EnvironmentConfigModule {}
