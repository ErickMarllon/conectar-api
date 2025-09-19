import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PgsqlTenantAddressM, PgsqlTenantM } from '../entities';

export class CreateTenantAddressSeed1757327423979 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const addressRepository = dataSource.getRepository(PgsqlTenantAddressM);
    const tenantRepository = dataSource.getRepository(PgsqlTenantM);
    const addressFactory = factoryManager.get(PgsqlTenantAddressM);

    console.log('🏠 Criando endereços...');

    const tenants = await tenantRepository.find();

    if (!tenants.length) {
      console.log('❌ Não há usuários cadastrados para criar endereços.');
      return;
    }

    for (const tenant of tenants) {
      const existingDefault = await addressRepository.findOne({
        where: { tenant, is_default: true },
      });

      if (!existingDefault) {
        const address = await addressFactory.make();
        address.tenant = tenant;
        address.is_default = true;
        await addressRepository.save(address);
        console.log(`✅ Endereço default criado para usuário "${tenant.name}"`);
      }

      const randomAddresses = await addressFactory.saveMany(
        faker.number.int({ min: 1, max: 2 }),
        { tenant },
      );

      randomAddresses.forEach((addr) =>
        console.log(
          `📌 Endereço extra criado para usuário "${tenant.name}" → ${addr.street}, ${addr.city}`,
        ),
      );
    }

    console.log('🏁 Address seed completed!');
  }
}
