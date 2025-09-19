import { UserStatus } from '@/shared/enums';
import * as argon2 from 'argon2';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlUserM } from '../../entities';
import { generatePhoneNumberBrasil } from '../helpers/generatePhoneNumberBrasil';

export const UserFactory = setSeederFactory(PgsqlUserM, async (faker) => {
  const user = new PgsqlUserM();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  user.first_name = firstName.toLowerCase();
  user.last_name = lastName.toLowerCase();
  user.is_verified = faker.datatype.boolean();
  user.email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({
    length: 12,
    memorable: false,
    pattern: /[A-Za-z0-9@$!%*?&]/,
  });
  user.password = await argon2.hash(password);
  user.avatar_url = faker.image.avatar();
  user.last_login_at = faker.date.anytime();
  user.phone_number = generatePhoneNumberBrasil();
  user.cpf_cnpj = faker.string.numeric(11);
  user.status = faker.helpers.arrayElement(Object.values(UserStatus));
  return user;
});
