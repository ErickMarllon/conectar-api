import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { createDeletePlanUseCase } from '@/domain/usecase/pgsql/plan';
import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql';

import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class DeletePlanUseCaseModule {
  static DELETE_PLAN_USECASE = 'DELETE_PLAN_USECASE';

  static register(): DynamicModule {
    const exports = [DeletePlanUseCaseModule.DELETE_PLAN_USECASE];
    return {
      module: DeletePlanUseCaseModule,
      providers: [
        {
          provide: DeletePlanUseCaseModule.DELETE_PLAN_USECASE,
          inject: [PgsqlPlanRepository],
          useFactory: (planRepo: IPlanRepository) =>
            createDeletePlanUseCase(planRepo),
        },
      ],
      exports,
    };
  }
}
