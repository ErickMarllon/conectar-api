import { Module } from '@nestjs/common';
import {
  CreateNewPlanUseCaseModule,
  DeletePlanUseCaseModule,
  GetPlanUseCaseModule,
  ListPlanUseCaseModule,
  PatchPlanUseCaseModule,
} from './modules';

@Module({
  imports: [
    CreateNewPlanUseCaseModule.register(),
    GetPlanUseCaseModule.register(),
    ListPlanUseCaseModule.register(),
    PatchPlanUseCaseModule.register(),
    DeletePlanUseCaseModule.register(),
  ],
  exports: [
    CreateNewPlanUseCaseModule,
    GetPlanUseCaseModule,
    ListPlanUseCaseModule,
    PatchPlanUseCaseModule,
    DeletePlanUseCaseModule,
  ],
})
export class PlanUseCasesModule {}
