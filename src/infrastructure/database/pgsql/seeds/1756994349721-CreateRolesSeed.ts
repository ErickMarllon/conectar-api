import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PgsqlRoleM } from '../entities';

export class CreateRolesSeed1756994349721 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(PgsqlRoleM);

    const rolesData = [
      { name: 'OWNER', description: 'System Owner' },
      { name: 'ADMIN', description: 'System Administrator' },
      { name: 'MANAGER', description: 'System Manager' },
      { name: 'EMPLOYEE', description: 'System Employee' },
      { name: 'STAFF', description: 'System Staff' },
      { name: 'USER', description: 'System User' },
    ];

    for (const roleData of rolesData) {
      const roleExists = await roleRepository.findOneBy({
        name: roleData.name,
      });

      if (!roleExists) {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log(`Role ${roleData.name} created successfully`);
      } else {
        console.log(`Role ${roleData.name} already exists`);
      }
    }
  }
}
