import { PlanInterval } from '@/shared/enums';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlPlanM } from '../../entities';

export const PlanFactory = setSeederFactory(PgsqlPlanM, async (faker) => {
  const plan = new PgsqlPlanM();
  const planType = faker.word.sample();
  plan.name = planType;
  plan.description = faker.company.catchPhrase();
  plan.interval = faker.helpers.arrayElement([
    PlanInterval.ANNUALLY,
    PlanInterval.MONTHLY,
  ]);
  plan.max_users = faker.number.int({ min: 1, max: 100 });
  plan.max_products = faker.number.int({ min: 10, max: 1000 });
  plan.max_services = faker.number.int({ min: 5, max: 500 });

  return plan;
});
