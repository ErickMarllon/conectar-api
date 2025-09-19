import {
  IUserRepository,
  IUserSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createUpdateSocialUserUseCase } from '@/domain/usecase/pgsql/user';

import {
  PgsqlUserRepository,
  PgsqlUserSocialRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class UpdateSessionUserUseCaseModule {
  static UPDATE_SOCIAL_USER_USECASE = 'UPDATE_SOCIAL_USER_USECASE';

  static register(): DynamicModule {
    const exports = [UpdateSessionUserUseCaseModule.UPDATE_SOCIAL_USER_USECASE];
    return {
      module: UpdateSessionUserUseCaseModule,
      providers: [
        {
          provide: UpdateSessionUserUseCaseModule.UPDATE_SOCIAL_USER_USECASE,
          inject: [PgsqlUserRepository, PgsqlUserSocialRepository],
          useFactory: (
            usersRepo: IUserRepository,
            socialRepo: IUserSocialRepository,
          ) => createUpdateSocialUserUseCase(usersRepo, socialRepo),
        },
      ],
      exports,
    };
  }
}
