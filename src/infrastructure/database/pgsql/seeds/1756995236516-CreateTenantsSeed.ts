import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPlanM, PgsqlTenantM } from '../entities';

export class CreateTenantsSeed1756995236516 implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tenantRepository = dataSource.getRepository(PgsqlTenantM);
    const planRepository = dataSource.getRepository(PgsqlPlanM);
    const tenantFactory = factoryManager.get(PgsqlTenantM);

    const plans = await planRepository.find();
    if (!plans.length) {
      console.log('⚠️  No plans found. Please seed plans first.');
      return;
    }

    const defaultPlanNames = ['FREE', 'BASIC', 'PRO', 'ENTERPRISE'];

    for (const planName of defaultPlanNames) {
      const plan = plans.find((p) => p.name === planName);
      if (!plan) continue;

      const tenantExists = await tenantRepository.findOne({
        where: { plan },
      });
      if (!tenantExists) {
        const tenant = await tenantFactory.make();
        tenant.plan = plan;
        await tenantFactory.save(tenant);
        console.log(`✅ Tenant with plan "${plan.name}" created`);
      }
    }

    console.log('🎲 Creating random tenants...');
    for (let i = 0; i < 5; i++) {
      const tenant = await tenantFactory.make();
      tenant.plan = plans[Math.floor(Math.random() * plans.length)];
      await tenantFactory.save(tenant);
      console.log(
        `✨ Random tenant "${tenant.name}" created with plan "${tenant.plan.name}"`,
      );
    }

    console.log('🏁 Tenants seed completed!');
  }
}
