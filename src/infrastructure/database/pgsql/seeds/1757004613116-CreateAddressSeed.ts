import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlAddressM, PgsqlUserM } from '../entities';

export class CreateAddressSeed1757004613116 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const addressRepository = dataSource.getRepository(PgsqlAddressM);
    const userRepository = dataSource.getRepository(PgsqlUserM);
    const addressFactory = factoryManager.get(PgsqlAddressM);

    console.log('🏠 Criando endereços...');

    const users = await userRepository.find();

    if (!users.length) {
      console.log('❌ Não há usuários cadastrados para criar endereços.');
      return;
    }

    for (const user of users) {
      const existingDefault = await addressRepository.findOne({
        where: { user: { id: user.id }, is_default: true },
      });

      if (!existingDefault) {
        const defaultAddress = await addressFactory.make({
          user,
          is_default: true,
        });

        await addressRepository.save(defaultAddress);
        console.log(`✅ Endereço default criado para usuário "${user.email}"`);
      }

      const randomAddresses = await addressFactory.saveMany(
        faker.number.int({ min: 1, max: 2 }),
        { user },
      );

      randomAddresses.forEach((addr) =>
        console.log(
          `📌 Endereço extra criado para usuário "${user.email}" → ${addr.street}, ${addr.city}`,
        ),
      );
    }

    console.log('🏁 Address seed completed!');
  }
}
