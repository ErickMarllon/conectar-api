import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';
import jwtConfig from './jwt.config';
import metaConfig from './meta.config';

export const configurations = [
  databaseConfig,
  jwtConfig,
  appConfig,
  authConfig,
  googleConfig,
  metaConfig,
];
