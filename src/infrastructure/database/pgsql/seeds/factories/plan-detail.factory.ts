import { setSeederFactory } from 'typeorm-extension';
import { PgsqlPlanDetailM } from '../../entities';

export const PlanDetailFactory = setSeederFactory(
  PgsqlPlanDetailM,
  async () => {
    return new PgsqlPlanDetailM();
  },
);
