import { AppConfig } from '@/infrastructure/config/types/app-config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorFunction } from '@nestjs/terminus';

@Injectable()
export class EnvHealthIndicator {
  private readonly appConfig: AppConfig;

  constructor(private readonly configService: ConfigService) {
    this.appConfig = this.configService.getOrThrow<AppConfig>('app');
  }
  checkEnv: HealthIndicatorFunction = async () => {
    const { port, nodeEnv } = this.appConfig;

    const isHealthy = [port, nodeEnv].every(Boolean);

    return {
      env: {
        status: isHealthy ? 'up' : 'down',
        port,
        nodeEnv,
      },
    };
  };
}
