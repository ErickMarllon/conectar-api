import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories';
import { createListTenantUseCase } from '@/domain/usecase/pgsql/tenant';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module, JwtConfigModule] })
export class CreateListTenantUseCaseModule {
  static LIST_TENANT_USECASE = 'LIST_TENANT_USECASE';

  static register(): DynamicModule {
    const exports = [CreateListTenantUseCaseModule.LIST_TENANT_USECASE];
    return {
      module: CreateListTenantUseCaseModule,
      providers: [
        {
          provide: CreateListTenantUseCaseModule.LIST_TENANT_USECASE,
          inject: [PgsqlTenantRepository, AwsS3Service],
          useFactory: (tenantRepo: ITenantRepository, awsS3: IAwsService) =>
            createListTenantUseCase(tenantRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
