export type DatabaseConfig = {
  url: string;
  name: string;
  user: string;
  password: string;
  logging: boolean;
  migrationsRun: boolean;
  synchronize: boolean;
  maxConnections: number;
  adminPassword: string;
};
