import { Public } from '@/shared/decorators/public.decorator';
import { Environment } from '@/shared/enums/app.enum';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AppConfig } from 'src/infrastructure/config/types/app-config.type';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Health check' })
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const appConfig = this.configService.getOrThrow<AppConfig>('AppConfig');
    const list = [
      () => this.db.pingCheck('database'),
      ...(appConfig.nodeEnv === Environment.DEVELOPMENT
        ? [() => this.http.pingCheck('api-docs', `${appConfig.url}/api-docs`)]
        : []),
    ];
    return this.health.check(list);
  }
}
