import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { createToggleUserStatusUseCase } from '@/domain/usecase/pgsql/user';

import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class ToggleUserStatusUseCaseModule {
  static TOGGLE_USER_STATUS_USECASE = 'TOGGLE_USER_STATUS_USECASE';

  static register(): DynamicModule {
    const exports = [ToggleUserStatusUseCaseModule.TOGGLE_USER_STATUS_USECASE];
    return {
      module: ToggleUserStatusUseCaseModule,
      providers: [
        {
          provide: ToggleUserStatusUseCaseModule.TOGGLE_USER_STATUS_USECASE,
          inject: [PgsqlUserRepository],
          useFactory: (usersRepo: IUserRepository) =>
            createToggleUserStatusUseCase(usersRepo),
        },
      ],
      exports,
    };
  }
}
