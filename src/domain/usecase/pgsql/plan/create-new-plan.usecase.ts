import {
  CreatePlanInput,
  IPlanRepository,
} from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { PlanDto } from '@/main/controllers/plan/dto';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type CreateNewPlanUseCase = (input: CreatePlanInput) => Promise<PlanDto>;

export type CreateNewPlanUseCaseFactory = (
  planRepo: IPlanRepository,
) => CreateNewPlanUseCase;

export const createNewPlanUseCase: CreateNewPlanUseCaseFactory =
  (planRepo) => async (input) => {
    const plan = await planRepo.create(input);

    if (!plan) {
      throw new BadRequestException('Failed to create tenant');
    }

    return plainToInstance(PlanDto, plan, {
      excludeExtraneousValues: true,
    });
  };
