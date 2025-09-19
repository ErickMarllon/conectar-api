import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import {
  IRoleRepository,
  ISessionRepository,
  IUserOAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { createSigninOAuthUseCase } from '@/domain/usecase/pgsql/user/auth';

import {
  PgsqlRoleRepository,
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql/repositories/tenant.repository';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule],
})
export class SigninOAuthFactoryModule {
  static SIGNIN_OAUTH_USECASE = 'SIGNIN_OAUTH_USECASE';

  static register(): DynamicModule {
    return {
      module: SigninOAuthFactoryModule,
      providers: [
        {
          provide: this.SIGNIN_OAUTH_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlSessionRepository,
            PgsqlRoleRepository,
            PgsqlTenantRepository,
            JwtTokenService,
          ],
          useFactory: (
            usersRepo: IUserOAuthRepository,
            sessionRepo: ISessionRepository,
            roleRepo: IRoleRepository,
            tenantRepo: ITenantRepository,
            jwtService: IJwtService,
          ) =>
            createSigninOAuthUseCase(
              usersRepo,
              sessionRepo,
              roleRepo,
              tenantRepo,
              jwtService,
            ),
        },
      ],
      exports: [this.SIGNIN_OAUTH_USECASE],
    };
  }
}
