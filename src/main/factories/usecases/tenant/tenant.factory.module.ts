import { Module } from '@nestjs/common';
import { CreateGetTenantUseCaseModule } from './modules/create-get-tenant-usecase.module';
import { CreateListTenantUseCaseModule } from './modules/create-list-tenant-usecase.module';
import { CreatePatchTenantAddressUseCaseModule } from './modules/create-patch-Address-usecase.module';
import { CreatePatchTenantUseCaseModule } from './modules/create-patch-tenant-usecase.module';
import { CreateTenantUseCaseModule } from './modules/create-tenant-usecase.module';

@Module({
  imports: [
    CreateTenantUseCaseModule.register(),
    CreateListTenantUseCaseModule.register(),
    CreateGetTenantUseCaseModule.register(),
    CreatePatchTenantUseCaseModule.register(),
    CreatePatchTenantAddressUseCaseModule.register(),
  ],
  exports: [
    CreateTenantUseCaseModule,
    CreateListTenantUseCaseModule,
    CreateGetTenantUseCaseModule,
    CreatePatchTenantUseCaseModule,
    CreatePatchTenantAddressUseCaseModule,
  ],
})
export class TenantUseCasesModule {}
