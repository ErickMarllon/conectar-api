import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { createGetPlanUseCase } from '@/domain/usecase/pgsql/plan';

import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class GetPlanUseCaseModule {
  static GET_PLAN_USECASE = 'GET_PLAN_USECASE';

  static register(): DynamicModule {
    const exports = [GetPlanUseCaseModule.GET_PLAN_USECASE];
    return {
      module: GetPlanUseCaseModule,
      providers: [
        {
          provide: GetPlanUseCaseModule.GET_PLAN_USECASE,
          inject: [PgsqlPlanRepository],
          useFactory: (planRepo: IPlanRepository) =>
            createGetPlanUseCase(planRepo),
        },
      ],
      exports,
    };
  }
}
