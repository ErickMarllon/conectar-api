import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IAddressRepository,
  IRoleRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { createUserUseCase } from '@/domain/usecase/pgsql/user/create-user-usecase';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import {
  PgsqlRoleRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { PgsqlAddressRepository } from '@/infrastructure/database/pgsql/repositories/address.repository';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql/repositories/tenant.repository';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, CryptoModule] })
export class CreateUserUseCaseModule {
  static CREATE_USER_USECASE = 'CREATE_USER_USECASE';

  static register(): DynamicModule {
    const exports = [CreateUserUseCaseModule.CREATE_USER_USECASE];
    return {
      module: CreateUserUseCaseModule,
      providers: [
        {
          provide: CreateUserUseCaseModule.CREATE_USER_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlAddressRepository,
            PgsqlRoleRepository,
            PgsqlTenantRepository,
            AwsS3Service,
            Argon2Service,
          ],
          useFactory: (
            usersRepo: IUserRepository,
            addressRepo: IAddressRepository,
            roleRepo: IRoleRepository,
            tenantRepo: ITenantRepository,
            awsS3: IAwsService,
            crypto: CryptoGateway,
          ) =>
            createUserUseCase(
              usersRepo,
              addressRepo,
              roleRepo,
              tenantRepo,
              awsS3,
              crypto,
            ),
        },
      ],
      exports,
    };
  }
}
