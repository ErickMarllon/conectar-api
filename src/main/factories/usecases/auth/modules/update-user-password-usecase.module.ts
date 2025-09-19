import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  ISessionRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createUpdateUserPasswordUseCase } from '@/domain/usecase/pgsql/user/auth/update-user-password-usecase';

import {
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, CryptoModule] })
export class UpdateUserPasswordUseCaseModule {
  static UPDATE_USER_PASSWORD_USECASE = 'UPDATE_USER_PASSWORD_USECASE';

  static register(): DynamicModule {
    const exports = [
      UpdateUserPasswordUseCaseModule.UPDATE_USER_PASSWORD_USECASE,
    ];
    return {
      module: UpdateUserPasswordUseCaseModule,
      providers: [
        {
          provide: UpdateUserPasswordUseCaseModule.UPDATE_USER_PASSWORD_USECASE,
          inject: [PgsqlUserRepository, PgsqlSessionRepository, Argon2Service],
          useFactory: (
            usersRepo: IUserRepository,
            sessionRepo: ISessionRepository,
            crypto: CryptoGateway,
          ) => createUpdateUserPasswordUseCase(usersRepo, sessionRepo, crypto),
        },
      ],
      exports,
    };
  }
}
