import { AppConfig } from '@/infrastructure/config/types/app-config.type';
import { Public } from '@/infrastructure/http/decorators/public-routes.decorator';
import { EnvHealthIndicator } from '@/infrastructure/monitoring/indicators/env-health.indicator';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import os from 'os';

class HealthCheckComponent {
  status: 'up' | 'down';
  timestamp?: string;
  responseTime?: number;
  [key: string]: any;
}

class HealthCheckResponse {
  status: 'error' | 'ok' | 'shutting_down';
  info?: Record<string, HealthCheckComponent>;
  error?: Record<string, HealthCheckComponent>;
  details: Record<string, HealthCheckComponent>;
  timestamp: string;
  uptime: number;
  version?: string;
  environment?: string;
  responseTime?: string;
}

@Controller('')
@ApiTags('')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeormCheck: TypeOrmHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly memoryCheck: MemoryHealthIndicator,
    private readonly envCheck: EnvHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  @ApiOperation({
    summary: 'Comprehensive API health status check',
    description:
      'Returns detailed information about all system components including database, storage, memory, and environment',
  })
  @ApiOkResponse({
    description: 'Health check completed successfully',
    type: HealthCheckResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'One or more health checks failed',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async healthCheck(): Promise<HealthCheckResponse> {
    const startTime = Date.now();

    try {
      const healthCheckResult: HealthCheckResult =
        await this.healthCheckService.check([
          () =>
            this.typeormCheck.pingCheck('database', {
              timeout: 3000,
            }),

          () =>
            this.diskCheck.checkStorage('storage', {
              thresholdPercent: 0.9,
              path: process.platform === 'win32' ? 'C:\\' : '/',
            }),
          () => this.memoryCheck.checkHeap('memory_heap', 500 * 1024 * 1024),
          () => this.memoryCheck.checkRSS('memory_rss', 1000 * 1024 * 1024),
          () => this.envCheck.checkEnv(),
          () => this.checkExternalServices(),
          () => this.checkSystemResources(),
        ]);

      const responseTime = Date.now() - startTime;
      return this.enrichHealthResponse(healthCheckResult, responseTime);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return this.createErrorHealthResponse(error, responseTime);
    }
  }

  @Get('liveness')
  @Public()
  @ApiOperation({ summary: 'Liveness probe - basic API availability' })
  @ApiOkResponse({
    description: 'Service is alive and responding',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2025-11-10T00:00:20.846Z',
        uptime: 3600,
      },
    },
  })
  async liveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('readiness')
  @Public()
  @ApiOperation({ summary: 'Readiness probe - API ready to receive traffic' })
  @ApiOkResponse({
    description: 'Service is ready to handle requests',
    type: HealthCheckResponse,
  })
  async readiness(): Promise<HealthCheckResponse> {
    const startTime = Date.now();

    try {
      const basicChecks = await this.healthCheckService.check([
        () => this.typeormCheck.pingCheck('database', { timeout: 3000 }),
        () => this.envCheck.checkEnv(),
      ]);

      const responseTime = Date.now() - startTime;
      return this.enrichHealthResponse(basicChecks, responseTime);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return this.createErrorHealthResponse(error, responseTime);
    }
  }

  private async checkExternalServices(): Promise<HealthIndicatorResult> {
    try {
      const services = {
        cache: this.configService.get('CACHE_ENABLED') ? 'enabled' : 'disabled',
      };

      const isHealthy = true;

      return {
        external_services: {
          status: isHealthy ? 'up' : 'down',
          ...services,
          timestamp: new Date().toISOString(),
          note: services.cache === 'disabled' ? 'Cache is optional' : undefined,
        },
      };
    } catch (error) {
      return {
        external_services: {
          status: 'down',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  private async checkSystemResources(): Promise<HealthIndicatorResult> {
    try {
      const usage = process.memoryUsage();
      const loadAverage = os.loadavg();
      const cpus = os.cpus();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();

      const memoryUsagePercent = (usage.rss / totalMem) * 100;
      const isMemoryHealthy = memoryUsagePercent < 90;
      const isLoadHealthy = loadAverage[0] < cpus.length * 2;

      const isHealthy = isMemoryHealthy && isLoadHealthy;

      return {
        system_resources: {
          status: isHealthy ? 'up' : 'down',
          memory: {
            used: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
            rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
            external: `${Math.round(usage.external / 1024 / 1024)}MB`,
            arrayBuffers: `${Math.round(usage.arrayBuffers / 1024 / 1024)}MB`,
            systemTotal: `${Math.round(totalMem / 1024 / 1024)}MB`,
            systemFree: `${Math.round(freeMem / 1024 / 1024)}MB`,
            usagePercent: `${Math.round(memoryUsagePercent * 100) / 100}%`,
          },
          cpu: {
            loadAverage: loadAverage.map(
              (load) => Math.round(load * 100) / 100,
            ),
            cores: cpus.length,
            model: cpus[0]?.model || 'unknown',
            speed: cpus[0]?.speed ? `${cpus[0].speed}MHz` : 'unknown',
          },
          timestamp: new Date().toISOString(),
          ...(!isHealthy && {
            warnings: [
              ...(memoryUsagePercent >= 90 ? ['High memory usage'] : []),
              ...(loadAverage[0] >= cpus.length * 2 ? ['High CPU load'] : []),
            ],
          }),
        },
      };
    } catch (error) {
      return {
        system_resources: {
          status: 'down',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  private enrichHealthResponse(
    healthResult: HealthCheckResult,
    responseTime?: number,
  ): HealthCheckResponse {
    const appConfig = this.configService.get<AppConfig>('app');

    return {
      status: healthResult.status,
      info: healthResult.info,
      error: healthResult.error,
      details: healthResult.details,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: appConfig?.nodeEnv,
      ...(responseTime && { responseTime: `${responseTime}ms` }),
    };
  }

  private createErrorHealthResponse(
    error: any,
    responseTime?: number,
  ): HealthCheckResponse {
    const appConfig = this.configService.get<AppConfig>('app');

    return {
      status: 'error',
      error: {
        health_check: {
          status: 'down',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      },
      details: {
        health_check: {
          status: 'down',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: appConfig?.nodeEnv,
      ...(responseTime && { responseTime: `${responseTime}ms` }),
    };
  }
}
