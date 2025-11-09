import { PlanInterval } from '@/shared/enums';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPlanM } from '../entities';

export class CreatePlanSeed1756994743139 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const planRepository = dataSource.getRepository(PgsqlPlanM);
    const planFactory = factoryManager.get(PgsqlPlanM);

    const plansData = [
      {
        name: 'FREE',
        tier: 'Free',
        interval: PlanInterval.ANNUALLY,
        max_users: 5,
        max_products: 10,
        max_services: 10,
        description: 'Plano gratuito anual',
      },
      {
        name: 'FREE',
        tier: 'Free',
        interval: PlanInterval.MONTHLY,
        max_users: 5,
        max_products: 10,
        max_services: 10,
        description: 'Plano gratuito mensal',
      },
      {
        name: 'PRO',
        tier: 'Pro',
        interval: PlanInterval.ANNUALLY,
        max_users: 100,
        max_products: 200,
        max_services: 200,
        description: 'Plano profissional anual',
      },
      {
        name: 'PRO',
        tier: 'Pro',
        interval: PlanInterval.MONTHLY,
        max_users: 100,
        max_products: 200,
        max_services: 200,
        description: 'Plano profissional mensal',
      },
      {
        name: 'ENTERPRISE',
        tier: 'Enterprise',
        interval: PlanInterval.ANNUALLY,
        max_users: 10000,
        max_products: 1000,
        max_services: 1000,
        description: 'Plano empresarial anual',
      },
      {
        name: 'ENTERPRISE',
        tier: 'Enterprise',
        interval: PlanInterval.MONTHLY,
        max_users: 10000,
        max_products: 1000,
        max_services: 1000,
        description: 'Plano empresarial mensal',
      },
    ];

    for (const planData of plansData) {
      const exists = await planRepository.findOneBy({
        name: planData.name,
        interval: planData.interval,
      });

      if (!exists) {
        await planFactory.save(planData);
        console.log(`Plan ${planData.name} created successfully`);
      } else {
        console.log(`Plan ${planData.name} already exists`);
      }
    }

    console.log('Random plan created and Plans seed completed!');
  }
}
