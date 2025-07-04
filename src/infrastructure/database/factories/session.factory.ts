import { setSeederFactory } from 'typeorm-extension';
import { Session } from '../entities/session-typeorm.entity';

export default setSeederFactory(Session, (fake) => {
  const session = new Session();
  session.source = fake.helpers.arrayElement(['google', 'jwt']);
  session.source_id = fake.string.uuid();
  session.access_token = fake.string.uuid();
  session.refresh_token = fake.datatype.boolean() ? fake.string.uuid() : null;
  session.expires = fake.date.future();
  return session;
});
