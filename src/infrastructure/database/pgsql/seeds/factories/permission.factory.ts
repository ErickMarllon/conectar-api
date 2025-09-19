import { setSeederFactory } from 'typeorm-extension';
import { PgsqlPermissionM } from '../../entities';

export const PermissionFactory = setSeederFactory(PgsqlPermissionM, (faker) => {
  const permission = new PgsqlPermissionM();

  permission.code = faker.helpers
    .slugify(faker.word.words({ count: 2 }))
    .toUpperCase();
  permission.description = faker.lorem.sentence();
  permission.created_at = new Date();
  permission.updated_at = new Date();

  return permission;
});
