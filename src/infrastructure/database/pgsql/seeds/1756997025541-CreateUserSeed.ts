import { UserStatus } from '@/shared/enums';
import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlRoleM, PgsqlTenantM, PgsqlUserM } from '../entities';
import { generatePhoneNumberBrasil } from './helpers/generatePhoneNumberBrasil';

export class CreateUserSeed1756997025541 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(PgsqlUserM);
    const tenantRepository = dataSource.getRepository(PgsqlTenantM);
    const roleRepository = dataSource.getRepository(PgsqlRoleM);
    const userFactory = factoryManager.get(PgsqlUserM);

    console.log('Creating users...');

    const tenants = await tenantRepository.find();
    const roles = await roleRepository.find();

    if (!tenants.length || !roles.length) {
      console.log('Não há tenants ou roles cadastrados para criar usuários.');
      return;
    }

    const defaultUsersSeed = async (
      role: PgsqlRoleM,
      tenant: PgsqlTenantM,
    ) => ({
      first_name: `system`,
      last_name: `${role.name.toLowerCase()}`,
      email: `system${role.name.toLowerCase()}@teste.com`,
      phone_number: generatePhoneNumberBrasil(),
      password: await argon2.hash('123456aA@'),
      status: UserStatus.ACTIVE,
      is_verified: true,
      tenant,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (const tenant of tenants) {
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        const mockUser = await defaultUsersSeed(role, tenant);
        const userExists = await userRepository.findOneBy({
          email: mockUser.email,
          role: { id: role.id },
          tenant: { id: tenant.id },
        });

        if (!userExists) {
          const user = userRepository.create(mockUser);
          await userRepository
            .save(user)
            .then((response) =>
              console.log(
                `✅ User "${response.email}" with ${response.tenant.name} plan created`,
              ),
            );
        } else {
          console.log(`⏩ User "${userExists.email}" already exists`);
        }
      }

      const role = roles.find((r) => r.name === 'USER');

      console.log('Creating random users with factory...');

      if (role) {
        await userFactory.saveMany(10, { tenant, role });
      }
    }

    console.log('Users seed completed!');
  }
}
