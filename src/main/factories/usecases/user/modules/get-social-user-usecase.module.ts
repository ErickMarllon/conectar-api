import {
  IUserRepository,
  IUserSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createFindSocialUserByIdUseCase } from '@/domain/usecase/pgsql/user';

import {
  PgsqlUserRepository,
  PgsqlUserSocialRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class GetSocialUserUseCaseModule {
  static GET_SOCIAL_USER_USECASE = 'GET_SOCIAL_USER_USECASE';

  static register(): DynamicModule {
    const exports = [GetSocialUserUseCaseModule.GET_SOCIAL_USER_USECASE];
    return {
      module: GetSocialUserUseCaseModule,
      providers: [
        {
          provide: GetSocialUserUseCaseModule.GET_SOCIAL_USER_USECASE,
          inject: [PgsqlUserRepository, PgsqlUserSocialRepository],
          useFactory: (
            usersRepo: IUserRepository,
            socialRepo: IUserSocialRepository,
          ) => createFindSocialUserByIdUseCase(usersRepo, socialRepo),
        },
      ],
      exports,
    };
  }
}
