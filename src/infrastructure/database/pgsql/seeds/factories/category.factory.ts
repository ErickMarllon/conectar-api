import { setSeederFactory } from 'typeorm-extension';
import { PgsqlCategoryM } from '../../entities';

export const CategoryFactory = setSeederFactory(
  PgsqlCategoryM,
  async (faker) => {
    const category = new PgsqlCategoryM();
    const baseName = faker.commerce.department();
    const uniqueName = `${baseName}-${faker.number.int({ min: 1, max: 9999 })}`;

    category.name = uniqueName;
    category.type = faker.helpers.arrayElement(['product', 'service']);
    category.created_at = new Date();
    category.updated_at = new Date();

    return category;
  },
);
