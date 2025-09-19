import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IRoleRepository,
  ISessionRepository,
  IUserAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { IPlanRepository } from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { createSignupUseCase } from '@/domain/usecase/pgsql/user/auth';

import {
  PgsqlRoleRepository,
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql/repositories/plan.repository';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql/repositories/tenant.repository';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule, CryptoModule],
})
export class SignupFactoryModule {
  static SIGNUP_USECASE = 'SIGNUP_USECASE';

  static register(): DynamicModule {
    const exports = [SignupFactoryModule.SIGNUP_USECASE];

    return {
      module: SignupFactoryModule,
      providers: [
        {
          provide: SignupFactoryModule.SIGNUP_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlSessionRepository,
            PgsqlPlanRepository,
            PgsqlTenantRepository,
            PgsqlRoleRepository,
            JwtTokenService,
            Argon2Service,
          ],

          useFactory: (
            usersRepo: IUserAuthRepository,
            sessionRepo: ISessionRepository,
            planRepo: IPlanRepository,
            tenantRepo: ITenantRepository,
            roleRepo: IRoleRepository,
            jwtService: IJwtService,
            crypto: CryptoGateway,
          ) =>
            createSignupUseCase(
              usersRepo,
              sessionRepo,
              planRepo,
              tenantRepo,
              roleRepo,
              jwtService,
              crypto,
            ),
        },
      ],
      exports,
    };
  }
}
