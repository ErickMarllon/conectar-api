import { AppConfig } from '@/infrastructure/config/types/app-config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthIndicatorFunction,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import * as packageJson from '../../../../package.json';

@Injectable()
export class EnvHealthIndicator {
  private readonly appConfig: AppConfig;
  private readonly version: string;

  constructor(private readonly configService: ConfigService) {
    this.appConfig = this.configService.getOrThrow<AppConfig>('app');
    this.version = packageJson.version;
  }

  checkEnv: HealthIndicatorFunction =
    async (): Promise<HealthIndicatorResult> => {
      try {
        const { port, nodeEnv, name } = this.appConfig;

        const criticalEnvVars = {
          port,
          nodeEnv,
          name,
          databaseUrl: this.configService.get('DATABASE_URL'),
        };

        const isHealthy = Object.values(criticalEnvVars).every(
          (value) => value != null,
        );

        const result: HealthIndicatorResult = {
          env: {
            status: isHealthy ? 'up' : 'down',
            timestamp: new Date().toISOString(),
            port,
            nodeEnv,
            name,
            version: packageJson.version,
            databaseUrl: criticalEnvVars.databaseUrl ? 'configured' : 'missing',
            additionalInfo: {
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              platform: process.platform,
              arch: process.arch,
              memoryUsage: {
                rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
                heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
                heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
                external: `${Math.round(process.memoryUsage().external / 1024 / 1024)}MB`,
              },
              uptime: `${Math.round(process.uptime())}s`,
              pid: process.pid,
              cwd: process.cwd(),
            },
          },
        };

        if (!isHealthy) {
          result.env.error = 'Missing critical environment variables';

          const missingVars = Object.entries(criticalEnvVars)
            .filter(([_, value]) => value == null)
            .map(([key]) => key);

          result.env.missingVariables = missingVars;
        }

        return result;
      } catch (error) {
        return {
          env: {
            status: 'down',
            error: error.message,
            timestamp: new Date().toISOString(),
          },
        };
      }
    };
}
