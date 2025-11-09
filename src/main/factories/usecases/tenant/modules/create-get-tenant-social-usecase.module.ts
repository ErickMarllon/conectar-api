import { ITenantRepository } from '@/domain/contracts/pgsql/repositories';
import { createGetTenantSocialUseCase } from '@/domain/usecase/pgsql/tenant';

import { PgsqlTenantAddressRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class CreateGetTenantSocialUseCaseModule {
  static GET_TENANT_SOCIAL_USECASE = 'GET_TENANT_SOCIAL_USECASE';

  static register(): DynamicModule {
    const exports = [
      CreateGetTenantSocialUseCaseModule.GET_TENANT_SOCIAL_USECASE,
    ];
    return {
      module: CreateGetTenantSocialUseCaseModule,
      providers: [
        {
          provide: CreateGetTenantSocialUseCaseModule.GET_TENANT_SOCIAL_USECASE,
          inject: [PgsqlTenantAddressRepository],
          useFactory: (tenantRepo: ITenantRepository) =>
            createGetTenantSocialUseCase(tenantRepo),
        },
      ],
      exports,
    };
  }
}
