import {
  IAddressRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createUpdateUserAddressUseCase } from '@/domain/usecase/pgsql/user/update-user-address-usecase';
import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';

import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlAddressRepository } from '@/infrastructure/database/pgsql/repositories/address.repository';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class UpdateUserAddressUseCaseModule {
  static UPDATE_USER_ADDRES_USECASE = 'UPDATE_USER_ADDRES_USECASE';

  static register(): DynamicModule {
    const exports = [UpdateUserAddressUseCaseModule.UPDATE_USER_ADDRES_USECASE];
    return {
      module: UpdateUserAddressUseCaseModule,
      providers: [
        {
          provide: UpdateUserAddressUseCaseModule.UPDATE_USER_ADDRES_USECASE,
          inject: [PgsqlAddressRepository, PgsqlUserRepository],
          useFactory: (
            addressRepo: IAddressRepository,
            usersRepo: IUserRepository,
          ) => createUpdateUserAddressUseCase(addressRepo, usersRepo),
        },
      ],
      exports,
    };
  }
}
