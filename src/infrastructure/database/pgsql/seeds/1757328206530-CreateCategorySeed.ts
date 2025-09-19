import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlCategoryM, PgsqlTenantM } from '../entities';

export class CreateCategorySeed1757328206530 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tenantRepo = dataSource.getRepository(PgsqlTenantM);
    const categoryRepo = dataSource.getRepository(PgsqlCategoryM);
    const factory = factoryManager.get(PgsqlCategoryM);

    const tenants = await tenantRepo.find();

    for (const tenant of tenants) {
      const count = faker.number.int({ min: 3, max: 6 });

      for (let i = 0; i < count; i++) {
        const category = await factory.make();
        category.tenant = tenant;

        await categoryRepo.save(category);
      }
    }
  }
}
