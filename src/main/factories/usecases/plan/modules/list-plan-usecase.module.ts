import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { createListPlanUseCase } from '@/domain/usecase/pgsql/plan';
import { PgsqlPlanRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class ListPlanUseCaseModule {
  static LIST_PLAN_USECASE = 'LIST_PLAN_USECASE';

  static register(): DynamicModule {
    const exports = [ListPlanUseCaseModule.LIST_PLAN_USECASE];
    return {
      module: ListPlanUseCaseModule,
      providers: [
        {
          provide: ListPlanUseCaseModule.LIST_PLAN_USECASE,
          inject: [PgsqlPlanRepository],
          useFactory: (plantRepo: IPlanRepository) =>
            createListPlanUseCase(plantRepo),
        },
      ],
      exports,
    };
  }
}
