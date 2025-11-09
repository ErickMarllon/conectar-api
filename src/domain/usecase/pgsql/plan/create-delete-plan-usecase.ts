import { IPlanRepository } from '@/domain/contracts/pgsql/repositories';

export type DeletePlanUseCase = (input: string) => Promise<void>;

export type DeletePlanUseCaseFactory = (
  planRepo: IPlanRepository,
) => DeletePlanUseCase;

export const createDeletePlanUseCase: DeletePlanUseCaseFactory =
  (planRepo) => async (id) => {
    const plan = await planRepo.findOneBy({ id });

    if (!plan) {
      throw new Error('Plan not found');
    }

    return await planRepo.delete(id);
  };
