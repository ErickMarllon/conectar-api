import { DeliveryMethod, ValueType } from '@/shared/enums';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlServiceM } from '../../entities/service.entity';

export const ServiceFactory = setSeederFactory(PgsqlServiceM, async (faker) => {
  const service = new PgsqlServiceM();

  service.name = faker.commerce.productName();
  service.description = faker.lorem.sentences(2);
  service.price = parseFloat(faker.commerce.price({ min: 50, max: 1000 }));
  service.discount_type = faker.helpers.arrayElement([
    ValueType.FIXED,
    ValueType.PERCENTAGE,
  ]);
  service.discount_value =
    service.discount_type === ValueType.PERCENTAGE
      ? faker.number.int({ min: 5, max: 30 })
      : faker.number.int({ min: 10, max: 100 });
  service.DeliveryMethod = faker.helpers.arrayElement([
    DeliveryMethod.DELIVERY,
    DeliveryMethod.PICKUP,
  ]);
  service.created_at = new Date();
  service.updated_at = new Date();

  return service;
});
