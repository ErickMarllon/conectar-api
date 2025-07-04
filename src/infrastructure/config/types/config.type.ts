import { AppConfig } from './app-config.type';
import { AuthConfig } from './auth-config.type';
import { DatabaseConfig } from './database-config.type';
import { GoogleConfig } from './google-config.type';
import { JwtConfig } from './jwt-config.type';
import { MetaConfig } from './meta-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
  google: GoogleConfig;
  meta: MetaConfig;
};
