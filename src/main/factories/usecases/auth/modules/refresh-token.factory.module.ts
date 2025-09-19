import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ISessionRepository } from '@/domain/contracts/pgsql/repositories';
import { createRefreshTokenUseCase } from '@/domain/usecase/pgsql/user/auth';

import { PgsqlSessionRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule],
})
export class RefreshTokenFactoryModule {
  static REFRESH_TOKEN_USECASE = 'REFRESH_TOKEN_USECASE';

  static register(): DynamicModule {
    const exports = [RefreshTokenFactoryModule.REFRESH_TOKEN_USECASE];

    return {
      module: RefreshTokenFactoryModule,
      providers: [
        {
          provide: RefreshTokenFactoryModule.REFRESH_TOKEN_USECASE,
          inject: [PgsqlSessionRepository, JwtTokenService],

          useFactory: (
            sessionRepo: ISessionRepository,
            jwtService: IJwtService,
          ) => createRefreshTokenUseCase(sessionRepo, jwtService),
        },
      ],
      exports,
    };
  }
}
