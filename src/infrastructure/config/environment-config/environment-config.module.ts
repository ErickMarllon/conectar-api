import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import awsConfig from './aws.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';
import jwtConfig from './jwt.config';
import metaConfig from './meta.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.env.${process.env.NODE_ENV}`, 'env/.env', '.env'],
      load: [
        appConfig,
        databaseConfig,
        googleConfig,
        jwtConfig,
        metaConfig,
        awsConfig,
      ],
    }),
  ],
  exports: [ConfigModule],
})
export class EnvironmentConfigModule {}
