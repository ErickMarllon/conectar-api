import { ITenantAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { createDeleteTenantAddressUseCase } from '@/domain/usecase/pgsql/tenant';
import { PgsqlTenantAddressRepository } from '@/infrastructure/database/pgsql';

import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class CreateDelTenantAddressUseCaseModule {
  static DELETE_TENANT_ADDRESS_USECASE = 'DELETE_TENANT_ADDRESS_USECASE';

  static register(): DynamicModule {
    const exports = [
      CreateDelTenantAddressUseCaseModule.DELETE_TENANT_ADDRESS_USECASE,
    ];
    return {
      module: CreateDelTenantAddressUseCaseModule,
      providers: [
        {
          provide:
            CreateDelTenantAddressUseCaseModule.DELETE_TENANT_ADDRESS_USECASE,
          inject: [PgsqlTenantAddressRepository],
          useFactory: (addressRepo: ITenantAddressRepository) =>
            createDeleteTenantAddressUseCase(addressRepo),
        },
      ],
      exports,
    };
  }
}
