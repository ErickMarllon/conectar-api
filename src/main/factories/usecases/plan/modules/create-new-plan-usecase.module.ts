import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { createNewPlanUseCase } from '@/domain/usecase/pgsql/plan';

import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class CreateNewPlanUseCaseModule {
  static CREATE_PLAN_USECASE = 'CREATE_PLAN_USECASE';

  static register(): DynamicModule {
    const exports = [CreateNewPlanUseCaseModule.CREATE_PLAN_USECASE];
    return {
      module: CreateNewPlanUseCaseModule,
      providers: [
        {
          provide: CreateNewPlanUseCaseModule.CREATE_PLAN_USECASE,
          inject: [PgsqlPlanRepository],
          useFactory: (planRepo: IPlanRepository) =>
            createNewPlanUseCase(planRepo),
        },
      ],
      exports,
    };
  }
}
