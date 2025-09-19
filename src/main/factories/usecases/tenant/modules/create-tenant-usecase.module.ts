import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IRoleRepository,
  ISessionRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { IPlanRepository } from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { createTenantUseCase } from '@/domain/usecase/pgsql/tenant/create-tenant.usecase';

import {
  PgsqlRoleRepository,
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql/repositories/tenant.repository';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, JwtConfigModule, CryptoModule] })
export class CreateTenantUseCaseModule {
  static CREATE_TENANT_USECASE = 'CREATE_TENANT_USECASE';

  static register(): DynamicModule {
    const exports = [CreateTenantUseCaseModule.CREATE_TENANT_USECASE];
    return {
      module: CreateTenantUseCaseModule,
      providers: [
        {
          provide: CreateTenantUseCaseModule.CREATE_TENANT_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlSessionRepository,
            PgsqlRoleRepository,
            PgsqlTenantRepository,
            JwtTokenService,
            Argon2Service,
          ],
          useFactory: (
            usersRepo: IUserRepository,
            sessionRepo: ISessionRepository,
            planRepo: IPlanRepository,
            roleRepo: IRoleRepository,
            tenantRepo: ITenantRepository,
            jwtService: IJwtService,
            crypto: CryptoGateway,
          ) =>
            createTenantUseCase(
              usersRepo,
              sessionRepo,
              planRepo,
              roleRepo,
              tenantRepo,
              jwtService,
              crypto,
            ),
        },
      ],
      exports,
    };
  }
}
