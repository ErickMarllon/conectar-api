import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlTenantM, PgsqlTenantNotificationSettingM } from '../entities';

export class CreateTenantNotificationSettingSeed1757177575994
  implements Seeder
{
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tenantRepo = dataSource.getRepository(PgsqlTenantM);
    const settingRepo = dataSource.getRepository(
      PgsqlTenantNotificationSettingM,
    );
    const tenantNotificationSettingFactory = factoryManager.get(
      PgsqlTenantNotificationSettingM,
    );

    const tenants = await tenantRepo.find();

    for (const tenant of tenants) {
      const exists = await settingRepo.findOne({
        where: { tenant: { id: tenant.id } },
      });

      if (!exists && tenant) {
        const setting = await tenantNotificationSettingFactory.make();
        setting.tenant = tenant;
        await settingRepo.save(setting);
      }
    }
  }
}
