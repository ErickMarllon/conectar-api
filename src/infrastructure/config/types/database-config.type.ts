export type DatabaseConfig = {
  url: string;
  logging: boolean;
  migrationsRun: boolean;
  synchronize: boolean;
  maxConnections: number;
};
