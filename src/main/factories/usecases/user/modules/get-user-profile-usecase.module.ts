import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { createUserProfiledUseCase } from '@/domain/usecase/pgsql/user';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, JwtConfigModule, AwsS3Module] })
export class GetUserProfileUseCaseModule {
  static GET_USER_PROFILE_USECASE = 'GET_USER_PROFILE_USECASE';

  static register(): DynamicModule {
    const exports = [GetUserProfileUseCaseModule.GET_USER_PROFILE_USECASE];
    return {
      module: GetUserProfileUseCaseModule,
      providers: [
        {
          provide: GetUserProfileUseCaseModule.GET_USER_PROFILE_USECASE,
          inject: [PgsqlUserRepository, AwsS3Service],
          useFactory: (usersRepo: IUserRepository, awsS3: IAwsService) =>
            createUserProfiledUseCase(usersRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
