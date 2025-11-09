import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlUserM, PgsqlUserSocialM } from '../entities';

export class CreateUserSocialSeed1757326461709 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepo = dataSource.getRepository(PgsqlUserM);
    const userSocialRepo = dataSource.getRepository(PgsqlUserSocialM);

    console.log('🌐 Iniciando criação de UserSocial...');

    const users = await userRepo.find();

    if (!users.length) {
      console.log('❌ Nenhum usuário encontrado. Nenhum registro será criado.');
      return;
    }

    const factory = factoryManager.get(PgsqlUserSocialM);

    for (const user of users) {
      const exists = await userSocialRepo.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });

      if (exists) {
        console.log(`⏩ Usuário "${user.email}" já possui UserSocial.`);
        continue;
      }

      const userSocial = await factory.make();
      userSocial.user = user;

      await userSocialRepo.save(userSocial);

      console.log(`✅ UserSocial criado para "${user.email}".`);
    }

    console.log('🏁 Seed de UserSocial finalizado com sucesso!');
  }
}
