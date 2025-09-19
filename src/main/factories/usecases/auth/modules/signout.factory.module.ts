import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ISessionRepository } from '@/domain/contracts/pgsql/repositories';
import { createSignOutUseCase } from '@/domain/usecase/pgsql/user/auth/signout.usecase';

import { PgsqlSessionRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule],
})
export class SignoutFactoryModule {
  static SIGNOUT_USECASE = 'SIGNOUT_USECASE';

  static register(): DynamicModule {
    const exports = [SignoutFactoryModule.SIGNOUT_USECASE];

    return {
      module: SignoutFactoryModule,
      providers: [
        {
          provide: SignoutFactoryModule.SIGNOUT_USECASE,
          inject: [PgsqlSessionRepository, JwtTokenService],

          useFactory: (
            sessionRepo: ISessionRepository,
            jwtService: IJwtService,
          ) => createSignOutUseCase(sessionRepo, jwtService),
        },
      ],
      exports,
    };
  }
}
