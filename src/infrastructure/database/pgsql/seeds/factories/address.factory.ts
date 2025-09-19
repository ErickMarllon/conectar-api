import { setSeederFactory } from 'typeorm-extension';
import { PgsqlAddressM } from '../../entities';

export const AddressFactory = setSeederFactory(PgsqlAddressM, async (faker) => {
  const address = new PgsqlAddressM();

  address.zip_code = faker.location.zipCode('########');
  address.street = faker.location.street();
  address.street_number = faker.string.numeric(3);
  address.neighborhood = faker.location.secondaryAddress();
  address.complement = faker.helpers.maybe(
    () => faker.location.buildingNumber(),
    { probability: 100 },
  );
  address.city = faker.location.city();
  address.state = faker.location.state();
  address.country = 'Brasil';
  address.is_default = false;

  return address;
});
