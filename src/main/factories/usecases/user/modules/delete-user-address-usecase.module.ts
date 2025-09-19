import { IAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { createDeleteUserAddressUseCase } from '@/domain/usecase/pgsql/user/delete-user-address-usecase';

import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlAddressRepository } from '@/infrastructure/database/pgsql/repositories/address.repository';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class DeleteUserAddressUseCaseModule {
  static DELETE_USER_ADDRESS_USECASE = 'DELETE_USER_ADDRESS_USECASE';

  static register(): DynamicModule {
    const exports = [
      DeleteUserAddressUseCaseModule.DELETE_USER_ADDRESS_USECASE,
    ];
    return {
      module: DeleteUserAddressUseCaseModule,
      providers: [
        {
          provide: DeleteUserAddressUseCaseModule.DELETE_USER_ADDRESS_USECASE,
          inject: [PgsqlAddressRepository],
          useFactory: (addressRepo: IAddressRepository) =>
            createDeleteUserAddressUseCase(addressRepo),
        },
      ],
      exports,
    };
  }
}
