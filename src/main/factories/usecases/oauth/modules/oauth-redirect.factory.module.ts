import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ICacheService } from '@/domain/contracts/gateways/cache.gateway';
import { processOauthRedirectUseCase } from '@/domain/usecase/pgsql/user/auth';

import { CacheConfigModule } from '@/infrastructure/providers/cache';
import { CacheService } from '@/infrastructure/providers/cache/cache.service';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [JwtConfigModule, CacheConfigModule],
})
export class OAuthRedirectFactoryModule {
  static PROCESS_OAUTH_REDIRECT_USECASE = 'PROCESS_OAUTH_REDIRECT_USECASE';

  static register(): DynamicModule {
    return {
      module: OAuthRedirectFactoryModule,
      providers: [
        {
          provide: this.PROCESS_OAUTH_REDIRECT_USECASE,
          inject: [JwtTokenService, CacheService],
          useFactory: (jwtService: IJwtService, cacheService: ICacheService) =>
            processOauthRedirectUseCase(jwtService, cacheService),
        },
      ],
      exports: [this.PROCESS_OAUTH_REDIRECT_USECASE],
    };
  }
}
