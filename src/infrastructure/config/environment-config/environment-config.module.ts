import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import appConfig from './app.config';
import awsConfig from './aws.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';
import jwtConfig from './jwt.config';
import metaConfig from './meta.config';
import webConfig from './web.config';

let envFile = '';

if (process.env.NODE_ENV && fs.existsSync(`env/.env.${process.env.NODE_ENV}`)) {
  envFile = `env/.env.${process.env.NODE_ENV}`;
} else if (fs.existsSync('/etc/secrets/.env')) {
  envFile = '/etc/secrets/.env';
} else if (fs.existsSync('env/.env')) {
  envFile = 'env/.env';
} else if (fs.existsSync('.env')) {
  envFile = '.env';
}

if (envFile) {
  dotenv.config({ path: envFile });
} else {
  console.warn(
    '⚠️ Nenhum arquivo .env encontrado, usando apenas variáveis de ambiente do sistema',
  );
}

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
