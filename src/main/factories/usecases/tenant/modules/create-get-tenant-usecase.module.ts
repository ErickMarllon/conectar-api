import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories';
import { createGetTenantUseCase } from '@/domain/usecase/pgsql/tenant';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module] })
export class CreateGetTenantUseCaseModule {
  static GET_TENANT_USECASE = 'GET_TENANT_USECASE';

  static register(): DynamicModule {
    const exports = [CreateGetTenantUseCaseModule.GET_TENANT_USECASE];
    return {
      module: CreateGetTenantUseCaseModule,
      providers: [
        {
          provide: CreateGetTenantUseCaseModule.GET_TENANT_USECASE,
          inject: [PgsqlTenantRepository, AwsS3Service],
          useFactory: (tenantRepo: ITenantRepository, awsS3: IAwsService) =>
            createGetTenantUseCase(tenantRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
