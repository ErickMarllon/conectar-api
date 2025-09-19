import { Public } from '@/infrastructure/http/decorators/public-routes.decorator';
import { EnvHealthIndicator } from '@/infrastructure/monitoring/indicators/env-health.indicator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

class HealthCheckComponent {
  status: string;
  [key: string]: any;
}

class HealthCheckResponse {
  status: string;
  info: Record<string, HealthCheckComponent>;
  error: Record<string, HealthCheckComponent>;
  details: Record<string, HealthCheckComponent>;
}

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeormCheck: TypeOrmHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly memoryCheck: MemoryHealthIndicator,
    private readonly envCheck: EnvHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiOkResponse({
    description: 'Health check response',
    type: HealthCheckResponse,
  })
  async healthCheck() {
    return await this.healthCheckService.check([
      () => this.typeormCheck.pingCheck('database', { timeout: 3000 }),
      () =>
        this.diskCheck.checkStorage('storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.memoryCheck.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.envCheck.checkEnv(),
    ]);
  }
}
