import {
  ITenantAddressRepository,
  ITenantRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createPatchTenantAddressUseCase } from '@/domain/usecase/pgsql/tenant';
import {
  PgsqlTenantAddressRepository,
  PgsqlTenantRepository,
} from '@/infrastructure/database/pgsql';

import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class CreatePatchTenantAddressUseCaseModule {
  static PATCH_TENANT_ADDRES_USECASE = 'PATCH_TENANT_ADDRES_USECASE';

  static register(): DynamicModule {
    const exports = [
      CreatePatchTenantAddressUseCaseModule.PATCH_TENANT_ADDRES_USECASE,
    ];
    return {
      module: CreatePatchTenantAddressUseCaseModule,
      providers: [
        {
          provide:
            CreatePatchTenantAddressUseCaseModule.PATCH_TENANT_ADDRES_USECASE,
          inject: [PgsqlTenantAddressRepository, PgsqlTenantRepository],
          useFactory: (
            addressRepo: ITenantAddressRepository,
            tenantRepo: ITenantRepository,
          ) => createPatchTenantAddressUseCase(addressRepo, tenantRepo),
        },
      ],
      exports,
    };
  }
}
