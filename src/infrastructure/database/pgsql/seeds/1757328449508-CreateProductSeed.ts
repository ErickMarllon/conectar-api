import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlTenantM } from '../entities';
import { PgsqlProductM } from '../entities/product.entity';

export class CreateProductSeed1757328449508 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tenantRepo = dataSource.getRepository(PgsqlTenantM);
    const productRepo = dataSource.getRepository(PgsqlProductM);
    const factory = factoryManager.get(PgsqlProductM);

    const tenants = await tenantRepo.find({
      relations: ['categories'],
    });

    if (!tenants.length) {
      console.log('⚠️ No categories found. Please seed categories first.');
      return;
    }

    for (const tenant of tenants) {
      if (!tenant) {
        console.log('⚠️ No tenant found. Please seed tenant first.');
        return;
      }
      const categories = tenant.categories;
      for (const category of categories) {
        const count = faker.number.int({ min: 3, max: 6 });

        for (let i = 0; i < count; i++) {
          const product = await factory.make();

          product.category = category;
          product.tenant = tenant;
          product.sku = faker.string.alphanumeric(count).toLowerCase();
          product.name = faker.commerce.productName();

          const productExistsName = await productRepo.findOne({
            where: { name: product.name },
          });
          const productExistsSku = await productRepo.findOne({
            where: { sku: product.sku },
          });

          if (!productExistsSku && !productExistsName) {
            await factory.save(product);
          }
        }
      }
    }
  }
}
