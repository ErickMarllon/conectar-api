export type CorsOrigin = (
  origin: string,
  callback: (err: Error | null, allow?: boolean) => void,
) => void;

export type AppConfig = {
  nodeEnv: string;
  name: string;
  url: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  corsOrigin: CorsOrigin;
};
