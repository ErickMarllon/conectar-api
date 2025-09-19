export type DatabaseConfig = {
  url: string;
  db_name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  logging: boolean;
  migrationsRun: boolean;
  synchronize: boolean;
  maxConnections: number;
  adminPassword: string;
};
