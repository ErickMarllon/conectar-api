import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlProductReviewM } from '../entities/product-review.entity';
import { PgsqlProductM } from '../entities/product.entity';
import { PgsqlUserM } from '../entities/user.entity';

export class CreateProductReviewSeed1757328733533 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const productRepo = dataSource.getRepository(PgsqlProductM);
    const userRepo = dataSource.getRepository(PgsqlUserM);
    const reviewRepo = dataSource.getRepository(PgsqlProductReviewM);
    const factory = factoryManager.get(PgsqlProductReviewM);

    const products = await productRepo.find();
    const users = await userRepo.find();

    for (const product of products) {
      const count = faker.number.int({ min: 2, max: 5 });

      for (let i = 0; i < count; i++) {
        const review = await factory.make();

        review.product = product;
        review.user = faker.helpers.arrayElement(users);

        await reviewRepo.save(review);
      }
    }
  }
}
