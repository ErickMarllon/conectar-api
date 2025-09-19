import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlTenantM } from '../entities';
import { PgsqlCategoryM } from '../entities/category.entity';
import { PgsqlServiceM } from '../entities/service.entity';

export class CreateServiceSeed1757329575828 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepo = dataSource.getRepository(PgsqlCategoryM);
    const tenantRepo = dataSource.getRepository(PgsqlTenantM);
    const serviceRepo = dataSource.getRepository(PgsqlServiceM);

    const factory = factoryManager.get(PgsqlServiceM);

    const categories = await categoryRepo.find();
    const tenants = await tenantRepo.find();

    for (const tenant of tenants) {
      const count = faker.number.int({ min: 3, max: 7 });

      for (let i = 0; i < count; i++) {
        const service = await factory.make();

        service.tenant = tenant;
        service.tenant_id = tenant.id;
        service.category = faker.helpers.arrayElement(categories);
        service.category_id = service.category.id;

        await serviceRepo.save(service);
      }
    }
  }
}
