import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlPermissionM } from '../entities';

export class CreatePermissionSeed1757259164934 implements Seeder {
  track = false;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repo = dataSource.getRepository(PgsqlPermissionM);

    // permissões fixas padrão
    const fixedPermissions = [
      { code: 'USER_CREATE', description: 'Permission to create users' },
      { code: 'USER_UPDATE', description: 'Permission to update users' },
      { code: 'USER_DELETE', description: 'Permission to delete users' },
      {
        code: 'ROLE_ASSIGN',
        description: 'Permission to assign roles to users',
      },
      {
        code: 'TENANT_MANAGE',
        description: 'Permission to manage tenant settings',
      },
    ];

    for (const perm of fixedPermissions) {
      const exists = await repo.findOne({ where: { code: perm.code } });
      if (!exists) {
        await repo.save(repo.create(perm));
      }
    }

    // gera algumas permissões fake adicionais
    const factory = factoryManager.get(PgsqlPermissionM);
    await factory.saveMany(5);
  }
}
