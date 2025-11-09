import {
  FindAllPlanParams,
  IPlanRepository,
} from '@/domain/contracts/pgsql/repositories';
import { ListPlanOutputDto } from '@/main/controllers/plan/dto';
import { PaginateResponse } from '@/shared/paginate/types';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type CreateListPlanUseCase = (
  input: FindAllPlanParams,
) => Promise<PaginateResponse<ListPlanOutputDto>>;

type CreateListPlanUseCaseFactory = (
  plantRepo: IPlanRepository,
) => CreateListPlanUseCase;

export const createListPlanUseCase: CreateListPlanUseCaseFactory =
  (plantRepo) => async (input) => {
    const paginated = await plantRepo.findAll(input);

    if (!paginated || !paginated.items) {
      throw new BadRequestException(`plan not found`);
    }
    const items = plainToInstance(ListPlanOutputDto, paginated.items ?? [], {
      excludeExtraneousValues: true,
    });

    return {
      items,
      meta: paginated?.meta,
    };
  };
