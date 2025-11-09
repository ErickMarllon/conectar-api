import {
  ITenantRepository,
  ITenantSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createPatchTenantSocialUseCase } from '@/domain/usecase/pgsql/tenant';
import {
  PgsqlTenantRepository,
  PgsqlTenantSocialRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class CreatePatchTenantSessionUseCaseModule {
  static PATCH_SOCIAL_USER_USECASE = 'PATCH_SOCIAL_USER_USECASE';

  static register(): DynamicModule {
    const exports = [
      CreatePatchTenantSessionUseCaseModule.PATCH_SOCIAL_USER_USECASE,
    ];
    return {
      module: CreatePatchTenantSessionUseCaseModule,
      providers: [
        {
          provide:
            CreatePatchTenantSessionUseCaseModule.PATCH_SOCIAL_USER_USECASE,
          inject: [PgsqlTenantRepository, PgsqlTenantSocialRepository],
          useFactory: (
            tenantRepo: ITenantRepository,
            socialRepo: ITenantSocialRepository,
          ) => createPatchTenantSocialUseCase(tenantRepo, socialRepo),
        },
      ],
      exports,
    };
  }
}
