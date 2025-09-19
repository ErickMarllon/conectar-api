import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPlanM } from '../entities';

export class CreatePlanSeed1756994743139 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const planFactory = factoryManager.get(PgsqlPlanM);

    const plansData = [
      {
        name: 'FREE',
        max_users: 5,
        max_products: 10,
        max_services: 10,
        description: 'System Owner',
      },
      {
        name: 'BASIC',
        max_users: 20,
        max_products: 50,
        max_services: 50,
        description: 'System Administrator',
      },
      {
        name: 'PRO',
        max_users: 100,
        max_products: 200,
        max_services: 200,
        description: 'System Manager',
      },
      {
        name: 'ENTERPRISE',
        max_users: 100000000,
        max_products: 1000000,
        max_services: 1000000,
        description: 'System Employee',
      },
    ];

    for (const planData of plansData) {
      const existing = await dataSource
        .getRepository(PgsqlPlanM)
        .findOneBy({ name: planData.name });

      if (!existing) {
        await planFactory.save(planData);
        console.log(`Plan ${planData.name} created successfully`);
      } else {
        console.log(`Plan ${planData.name} already exists`);
      }
    }

    await planFactory.saveMany(1);
    console.log('Random plan created and Plans seed completed!');
  }
}
