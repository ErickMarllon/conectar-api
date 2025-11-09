import { setSeederFactory } from 'typeorm-extension';
import { PgsqlPlanM } from '../../entities';

export const PlanFactory = setSeederFactory(PgsqlPlanM, async () => {
  return new PgsqlPlanM();
});
