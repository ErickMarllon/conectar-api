import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { createDeleteUserUseCase } from '@/domain/usecase/pgsql/user';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import { PgsqlUserRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, JwtConfigModule] })
export class DeleteUserUseCaseModule {
  static DELETE_USER_USECASE = 'DELETE_USER_USECASE';

  static register(): DynamicModule {
    const exports = [DeleteUserUseCaseModule.DELETE_USER_USECASE];
    return {
      module: DeleteUserUseCaseModule,
      providers: [
        {
          provide: DeleteUserUseCaseModule.DELETE_USER_USECASE,
          inject: [PgsqlUserRepository, AwsS3Service],
          useFactory: (usersRepo: IUserRepository, awsS3: IAwsService) =>
            createDeleteUserUseCase(usersRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
