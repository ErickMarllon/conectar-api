import { UserRole } from '@/shared/enums/app.enum';
import { hashPassword } from '@/shared/utils/password.util';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user-typeorm.entity';

export default setSeederFactory(User, async (fake) => {
  const user = new User();

  const firstName = fake.person.firstName();
  const lastName = fake.person.lastName();
  user.first_name = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  user.last_name = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  user.email = fake.internet.email({ firstName, lastName });
  user.password = await hashPassword('12345678aA@');
  user.picture = fake.image.avatar();
  user.role = fake.helpers.arrayElement([UserRole.ADMIN, UserRole.USER]);
  user.last_login_at = fake.date.recent({ days: 40 });
  user.country_code = '55';
  user.area_code = fake.string.numeric(2);
  user.phone = '9' + fake.string.numeric(8);
  user.whatsapp = `${user.country_code}${user.area_code}${user.phone}`;
  user.cpf = fake.string.numeric(11);
  return user;
});
