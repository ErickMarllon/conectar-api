import { setSeederFactory } from 'typeorm-extension';
import { PgsqlEventTypeM } from '../../entities';

export const EventTypeFactory = setSeederFactory(PgsqlEventTypeM, (faker) => {
  const eventType = new PgsqlEventTypeM();

  eventType.code = faker.string.alpha({ length: 6 }).toUpperCase();
  eventType.name = faker.word.words({ count: { min: 1, max: 3 } });
  eventType.description = faker.lorem.sentence();
  eventType.created_at = new Date();
  eventType.updated_at = new Date();

  return eventType;
});
