import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { createFindUserByIdUseCase } from '@/domain/usecase/pgsql/user';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, JwtConfigModule] })
export class GetUserUseCaseModule {
  static GET_USER_USECASE = 'GET_USER_USECASE';

  static register(): DynamicModule {
    const exports = [GetUserUseCaseModule.GET_USER_USECASE];
    return {
      module: GetUserUseCaseModule,
      providers: [
        {
          provide: GetUserUseCaseModule.GET_USER_USECASE,
          inject: [PgsqlUserRepository, AwsS3Service],
          useFactory: (usersRepo: IUserRepository, awsS3: IAwsService) =>
            createFindUserByIdUseCase(usersRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
