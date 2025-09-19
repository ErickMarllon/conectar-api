import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlTenantM, PgsqlTenantSocialM } from '../entities';

export class CreateTenantSocialSeed1757258332519 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tenantRepo = dataSource.getRepository(PgsqlTenantM);
    const socialRepo = dataSource.getRepository(PgsqlTenantSocialM);

    const tenants = await tenantRepo.find();

    for (const tenant of tenants) {
      const exists = await socialRepo.findOne({
        where: { tenant: { id: tenant.id } },
      });

      if (!exists) {
        const socialFactory = factoryManager.get(PgsqlTenantSocialM);
        const tenantSocial = await socialFactory.make();

        tenantSocial.tenant = tenant;

        await socialRepo.save(tenantSocial);
      }
    }
  }
}
