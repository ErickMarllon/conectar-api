import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TerminusModule } from '@nestjs/terminus';

// Strategies & Guards
import { JwtStrategy } from '@/infrastructure/auth/strategies';
import { GoogleStrategy } from '@/infrastructure/auth/strategies/google.strategy';
import { MetaStrategy } from '@/infrastructure/auth/strategies/meta.strategy';
import { JwtAuthGuard, RolesGuard } from '@/infrastructure/http/guards';

// Providers
import { EnvHealthIndicator } from '@/infrastructure/monitoring/indicators/env-health.indicator';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';

// Controllers
import { GenericEntityController } from './generic-entity/generic-entity.controller';
import { HealthController } from './health/health.controller';
import { UserController } from './user/user.controller';

// Factories
import { CRYPTO_GATEWAY } from '@/domain/contracts/gateways/crypto.gateway';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { MulterConfig } from '@/infrastructure/config/multer';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { CacheConfigModule } from '@/infrastructure/providers/cache';
import { PaginateModule } from '@/shared/paginate/paginate.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthFactoryModule } from '../factories/usecases/auth';
import { GenericEntityFactoryModule } from '../factories/usecases/generic-model.factory.module';
import { OAuthModule } from '../factories/usecases/oauth/oauth.module';
import { PlanUseCasesModule } from '../factories/usecases/plan';
import { TenantUseCasesModule } from '../factories/usecases/tenant/tenant.factory.module';
import { UserUseCasesModule } from '../factories/usecases/user/user.factory.module';
import { AuthController } from './auth/auth.controller';
import { OAuthController } from './auth/oauth.controller';
import { PlanController } from './plan/plan.controller';
import { TenantController } from './tenant/tenant.controller';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: MulterConfig }),
    PassportModule,
    JwtConfigModule,
    CacheConfigModule,
    TerminusModule,
    CryptoModule,
    OAuthModule,
    AuthFactoryModule,
    UserUseCasesModule,
    TenantUseCasesModule,
    PlanUseCasesModule,
    AwsS3Module,
    GenericEntityFactoryModule.register(),
    PaginateModule,
  ],
  controllers: [
    HealthController,
    AuthController,
    OAuthController,
    UserController,
    PlanController,
    TenantController,
    GenericEntityController,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: CRYPTO_GATEWAY,
      useClass: Argon2Service,
    },
    JwtStrategy,
    GoogleStrategy,
    MetaStrategy,
    EnvHealthIndicator,
  ],
})
export class ControllerModule {}
