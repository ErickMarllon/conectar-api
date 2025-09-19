import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { createListUsersUseCase } from '@/domain/usecase/pgsql/user';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';
import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, JwtConfigModule] })
export class ListUsersUseCaseModule {
  static LIST_USERS_USECASE = 'LIST_USERS_USECASE';

  static register(): DynamicModule {
    const exports = [ListUsersUseCaseModule.LIST_USERS_USECASE];
    return {
      module: ListUsersUseCaseModule,
      providers: [
        {
          provide: ListUsersUseCaseModule.LIST_USERS_USECASE,
          inject: [PgsqlUserRepository, AwsS3Service],
          useFactory: (usersRepo: IUserRepository, awsS3: IAwsService) =>
            createListUsersUseCase(usersRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
