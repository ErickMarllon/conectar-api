import { ValueType } from '@/shared/enums';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlProductM } from '../../entities';

export const ProductFactory = setSeederFactory(PgsqlProductM, async (faker) => {
  const product = new PgsqlProductM();

  product.description = faker.commerce.productDescription();
  product.price = parseFloat(
    faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
  );
  const stock_total = faker.number.int({ min: 50, max: 1200 });

  const reserved_quantity = faker.number.int({
    min: 0,
    max: Math.floor(stock_total * 0.7),
  });
  const available = stock_total - reserved_quantity;

  product.sold_quantity = stock_total;
  product.reserved_quantity = reserved_quantity;
  product.available = available;

  product.discount_type = faker.helpers.arrayElement([
    ValueType.FIXED,
    ValueType.PERCENTAGE,
  ]);
  product.discount_value =
    product.discount_type === ValueType.FIXED
      ? parseFloat(faker.commerce.price({ min: 5, max: 100, dec: 2 }))
      : faker.number.int({ min: 5, max: 50 });
  product.final_price =
    product.discount_type === ValueType.FIXED
      ? product.price - product.discount_value
      : product.price - (product.price * product.discount_value) / 100;
  product.total_rating = parseFloat(
    faker.commerce.price({ min: 0, max: 5, dec: 2 }),
  );
  product.total_review = faker.number.int({ min: 0, max: 1000 });
  product.gender = faker.helpers.arrayElement(['male', 'female', 'unisex']);

  product.created_at = new Date();
  product.updated_at = new Date();

  return product;
});
