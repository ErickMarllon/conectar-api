export type AppConfig = {
  nodeEnv: string;
  name: string;
  url: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  corsOrigin: boolean | string | string[];
};
