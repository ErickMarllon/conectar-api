import { UserRole } from '@/shared/enums/app.enum';
import { hashPassword } from '@/shared/utils/password.util';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/user-typeorm.entity';

export class SeedUsers1751079234126 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(User);
    const userFactory = factoryManager.get(User);
    const adminUser = await repository.findOneBy({
      email: 'admin@conectar.com',
    });

    if (!adminUser) {
      await repository.insert(
        repository.create({
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@conectar.com',
          country_code: '55',
          area_code: '21',
          phone: '999999999',
          whatsapp: '5521999999999',
          cpf: '12345678901',
          password: await hashPassword('Admin123@'),
          role: UserRole.ADMIN,
          last_login_at: new Date(),
          is_blocked: false,
        }),
      );
    }

    await userFactory.saveMany(50);
  }
}
