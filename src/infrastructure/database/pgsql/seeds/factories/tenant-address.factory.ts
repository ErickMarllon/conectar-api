import { setSeederFactory } from 'typeorm-extension';
import { PgsqlTenantAddressM } from '../../entities';

export const TenantAddressFactory = setSeederFactory(
  PgsqlTenantAddressM,
  (faker) => {
    const address = new PgsqlTenantAddressM();

    address.zip_code = faker.location.zipCode();
    address.street = faker.location.street();
    address.street_number = faker.location.buildingNumber();
    address.complement = faker.location.secondaryAddress();
    address.neighborhood = faker.location.county();
    address.city = faker.location.city();
    address.state = faker.location.state({ abbreviated: false });
    address.country = faker.location.country();
    address.created_at = new Date();
    address.updated_at = new Date();

    return address;
  },
);
