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
    const factory = factoryManager.get(PgsqlUserSocialM);

    const users = await userRepo.find();

    for (const user of users) {
      const userSocial = await factory.make();

      userSocial.user = user;
      await factory.save(userSocial);
    }
  }
}
