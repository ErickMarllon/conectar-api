import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { createPatchPlanUseCase } from '@/domain/usecase/pgsql/plan';
import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class PatchPlanUseCaseModule {
  static PATCH_PLAN_USECASE = 'PATCH_PLAN_USECASE';

  static register(): DynamicModule {
    const exports = [PatchPlanUseCaseModule.PATCH_PLAN_USECASE];
    return {
      module: PatchPlanUseCaseModule,
      providers: [
        {
          provide: PatchPlanUseCaseModule.PATCH_PLAN_USECASE,
          inject: [PgsqlPlanRepository],
          useFactory: (plantRepo: IPlanRepository) =>
            createPatchPlanUseCase(plantRepo),
        },
      ],
      exports,
    };
  }
}
