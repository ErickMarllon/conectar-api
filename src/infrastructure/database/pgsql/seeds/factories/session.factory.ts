import { SessionSource } from '@/shared/enums';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlSessionM } from '../../entities';

export const SessionFactory = setSeederFactory(PgsqlSessionM, async (faker) => {
  const session = new PgsqlSessionM();
  session.source = faker.helpers.arrayElement([
    SessionSource.GOOGLE,
    SessionSource.JWT,
    SessionSource.META,
  ]);
  session.source_id = faker.string.uuid();
  session.access_token = faker.string.uuid();
  session.refresh_token = faker.datatype.boolean()
    ? faker.string.uuid()
    : undefined;
  session.ip_address = faker.internet.ip();
  session.user_agent = faker.internet.userAgent();
  session.created_at = new Date();
  session.updated_at = new Date();
  return session;
});
