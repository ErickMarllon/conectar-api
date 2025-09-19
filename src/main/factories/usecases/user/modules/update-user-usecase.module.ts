import { IAwsService } from '@/domain/contracts/gateways/awss3';
import {
  IAddressRepository,
  IRoleRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createUpdateUserUseCase } from '@/domain/usecase/pgsql/user';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import {
  PgsqlRoleRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlAddressRepository } from '@/infrastructure/database/pgsql/repositories/address.repository';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, JwtConfigModule] })
export class UpdateUserUseCaseModule {
  static UPDATE_USER_USECASE = 'UPDATE_USER_USECASE';

  static register(): DynamicModule {
    const exports = [UpdateUserUseCaseModule.UPDATE_USER_USECASE];
    return {
      module: UpdateUserUseCaseModule,
      providers: [
        {
          provide: UpdateUserUseCaseModule.UPDATE_USER_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlAddressRepository,
            PgsqlRoleRepository,
            AwsS3Service,
          ],
          useFactory: (
            usersRepo: IUserRepository,
            addressRepo: IAddressRepository,
            roleRepo: IRoleRepository,
            awsS3: IAwsService,
          ) => createUpdateUserUseCase(usersRepo, addressRepo, roleRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
