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

    console.log('🌐 Iniciando criação de TenantSocial...');

    const tenants = await tenantRepo.find();

    if (!tenants.length) {
      console.log('❌ Nenhum tenant encontrado. Nenhum registro será criado.');
      return;
    }

    const socialFactory = factoryManager.get(PgsqlTenantSocialM);

    for (const tenant of tenants) {
      const exists = await socialRepo.findOne({
        where: { tenant: { id: tenant.id } },
        relations: ['tenant'],
      });

      if (exists) {
        console.log(`⏩ Tenant "${tenant.name}" já possui TenantSocial.`);
        continue;
      }

      const tenantSocial = await socialFactory.make();
      tenantSocial.tenant = tenant;

      await socialRepo.save(tenantSocial);

      console.log(`✅ TenantSocial criado para "${tenant.name}".`);
    }

    console.log('🏁 Seed de TenantSocial finalizado com sucesso!');
  }
}
