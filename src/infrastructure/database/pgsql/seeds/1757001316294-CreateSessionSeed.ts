import { SessionSource } from '@/shared/enums';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlSessionM, PgsqlTenantM, PgsqlUserM } from '../entities';

export class CreateSessionSeed1757001316294 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const sessionRepository = dataSource.getRepository(PgsqlSessionM);
    const sessionFactory = factoryManager.get(PgsqlSessionM);
    const userRepository = dataSource.getRepository(PgsqlUserM);
    const tenantRepository = dataSource.getRepository(PgsqlTenantM);

    console.log('Creating Session...');
    const users = await userRepository.find();

    if (!users.length) {
      console.log('❌ Não há usuários cadastrados para criar sessions.');
      return;
    }

    for (const user of users) {
      const sessionExists = await sessionRepository.findOne({
        where: { source: SessionSource.JWT, user: { id: user.id } },
      });

      if (!sessionExists) {
        const tenant = await tenantRepository.findOne({
          where: {
            users: { id: user.id },
          },
        });
        if (!tenant) {
          console.log('❌ Não há tenant cadastrados para criar sessions.');
          return;
        }
        const session = await sessionFactory.make();
        session.user = user;
        session.tenant = tenant;
        await sessionFactory.save(session);
        console.log(`✅ Session criada para o usuário "${user.email}"`);
      } else {
        console.log(`⏩ Usuário "${user.email}" já possui uma sessão`);
      }
    }

    console.log('Sessions seed completed!');
  }
}
