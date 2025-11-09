import { Module } from '@nestjs/common';
import {
  CreateDelTenantAddressUseCaseModule,
  CreateGetTenantSocialUseCaseModule,
  CreateGetTenantUseCaseModule,
  CreateListTenantUseCaseModule,
  CreatePatchTenantAddressUseCaseModule,
  CreatePatchTenantUseCaseModule,
  CreateTenantUseCaseModule,
} from './modules';
import { CreatePatchTenantSessionUseCaseModule } from './modules/create-patch-tenant-session-usecase.module';

@Module({
  imports: [
    CreateTenantUseCaseModule.register(),
    CreateListTenantUseCaseModule.register(),
    CreateGetTenantUseCaseModule.register(),
    CreatePatchTenantUseCaseModule.register(),
    CreatePatchTenantAddressUseCaseModule.register(),
    CreateDelTenantAddressUseCaseModule.register(),
    CreateGetTenantSocialUseCaseModule.register(),
    CreatePatchTenantSessionUseCaseModule.register(),
  ],
  exports: [
    CreateTenantUseCaseModule,
    CreateListTenantUseCaseModule,
    CreateGetTenantUseCaseModule,
    CreatePatchTenantUseCaseModule,
    CreatePatchTenantAddressUseCaseModule,
    CreateDelTenantAddressUseCaseModule,
    CreateGetTenantSocialUseCaseModule,
    CreatePatchTenantSessionUseCaseModule,
  ],
})
export class TenantUseCasesModule {}
