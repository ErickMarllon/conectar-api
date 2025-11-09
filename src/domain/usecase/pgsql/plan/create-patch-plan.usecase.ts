import {
  IPlanRepository,
  PatchPlanInput,
} from '@/domain/contracts/pgsql/repositories';
import { BadRequestException } from '@nestjs/common';

export type CreatePatchPlanUseCase = (input: PatchPlanInput) => Promise<void>;

export type CreatePatchPlanUseCaseFactory = (
  plantRepo: IPlanRepository,
) => CreatePatchPlanUseCase;

export const createPatchPlanUseCase: CreatePatchPlanUseCaseFactory =
  (plantRepo) => async (input) => {
    const { id, ...data } = input;
    const plan = await plantRepo.findOneBy({ id });

    if (!plan) {
      throw new BadRequestException(`Tenant not found`);
    }

    await plantRepo.update(plan.id, {
      ...data,
    });
  };
