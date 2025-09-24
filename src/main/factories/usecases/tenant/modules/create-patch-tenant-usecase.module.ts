import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories';
import { createPatchTenantUseCase } from '@/domain/usecase/pgsql/tenant';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';
import { PgsqlTenantRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module] })
export class CreatePatchTenantUseCaseModule {
  static PATCH_TENANT_USECASE = 'PATCH_TENANT_USECASE';

  static register(): DynamicModule {
    const exports = [CreatePatchTenantUseCaseModule.PATCH_TENANT_USECASE];
    return {
      module: CreatePatchTenantUseCaseModule,
      providers: [
        {
          provide: CreatePatchTenantUseCaseModule.PATCH_TENANT_USECASE,
          inject: [PgsqlTenantRepository, AwsS3Service],
          useFactory: (tenantRepo: ITenantRepository, awsS3: IAwsService) =>
            createPatchTenantUseCase(tenantRepo, awsS3),
        },
      ],
      exports,
    };
  }
}
