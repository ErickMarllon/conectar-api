import { Module } from '@nestjs/common';
import { CreateListTenantUseCaseModule } from './modules/create-list-tenant-usecase.module';
import { CreateTenantUseCaseModule } from './modules/create-tenant-usecase.module';

@Module({
  imports: [
    CreateTenantUseCaseModule.register(),
    CreateListTenantUseCaseModule.register(),
  ],
  exports: [CreateTenantUseCaseModule, CreateListTenantUseCaseModule],
})
export class TenantUseCasesModule {}
