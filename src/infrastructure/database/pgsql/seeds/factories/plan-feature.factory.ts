import { setSeederFactory } from 'typeorm-extension';
import { PgsqlPlanFeatureM } from '../../entities';

export const PlanFeatureFactory = setSeederFactory(
  PgsqlPlanFeatureM,
  async () => {
    return new PgsqlPlanFeatureM();
  },
);
