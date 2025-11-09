import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';
import { PlanDto } from '@/main/controllers/plan/dto';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type CreateGetPlanUseCase = (input: {
  id?: string;
  name?: string;
}) => Promise<PlanDto>;

export type CreateGetPlanUseCaseFactory = (
  plantRepo: IPlanRepository,
) => CreateGetPlanUseCase;

export const createGetPlanUseCase: CreateGetPlanUseCaseFactory =
  (plantRepo) => async (input) => {
    const plan = await plantRepo.findOneByWithRelation({
      where: { id: input.id, name: input.name },
    });

    if (!plan) {
      throw new BadRequestException(`Plan not found`);
    }

    return plainToInstance(PlanDto, plan, {
      excludeExtraneousValues: true,
    });
  };
