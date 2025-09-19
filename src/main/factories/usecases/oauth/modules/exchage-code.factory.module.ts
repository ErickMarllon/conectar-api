import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ICacheService } from '@/domain/contracts/gateways/cache.gateway';
import {
  ISessionRepository,
  IUserOAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { exchangeCodeForSessionUseCase } from '@/domain/usecase/pgsql/user/auth';

import {
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { CacheConfigModule } from '@/infrastructure/providers/cache';
import { CacheService } from '@/infrastructure/providers/cache/cache.service';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule, CacheConfigModule],
})
export class ExchageCodeFactoryModule {
  static EXCHANGE_CODE_OAUTH_USECASE = 'EXCHANGE_CODE_OAUTH_USECASE';

  static register(): DynamicModule {
    const exports = [ExchageCodeFactoryModule.EXCHANGE_CODE_OAUTH_USECASE];

    return {
      module: ExchageCodeFactoryModule,
      providers: [
        {
          provide: ExchageCodeFactoryModule.EXCHANGE_CODE_OAUTH_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlSessionRepository,
            JwtTokenService,
            CacheService,
          ],

          useFactory: (
            usersRepo: IUserOAuthRepository,
            sessionRepo: ISessionRepository,
            jwtService: IJwtService,
            cacheService: ICacheService,
          ) =>
            exchangeCodeForSessionUseCase(
              usersRepo,
              sessionRepo,
              jwtService,
              cacheService,
            ),
        },
      ],
      exports,
    };
  }
}
