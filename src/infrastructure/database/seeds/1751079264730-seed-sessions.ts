import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Session } from '../entities/session-typeorm.entity';
import { User } from '../entities/user-typeorm.entity';

export class SeedSessions1751079264730 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find();
    const postFactory = factoryManager.get(Session);

    for (const user of users) {
      await postFactory.saveMany(1, { user_id: user.id });
    }
  }
}
