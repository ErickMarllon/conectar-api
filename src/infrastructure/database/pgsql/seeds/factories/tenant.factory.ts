import { TenantStatus } from '@/shared/enums';
import { generateSlug } from '@/shared/utils/generate-slug';
import { setSeederFactory } from 'typeorm-extension';
import { PgsqlTenantM } from '../../entities';

export const TenantFactory = setSeederFactory(PgsqlTenantM, async (faker) => {
  const tenant = new PgsqlTenantM();

  tenant.name = faker.company.name();
  tenant.slug = generateSlug(tenant.name);
  tenant.whatsapp = `+55${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '91'])}9${faker.string.numeric(8)}`;
  tenant.phone_number = `+55${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '91'])}9${faker.string.numeric(8)}`;
  tenant.status = faker.helpers.arrayElement(Object.values(TenantStatus));
  tenant.enable_service_schedule = false;
  tenant.enable_google_calendar = false;
  tenant.about = faker.lorem.paragraph();
  tenant.logo_url = faker.image.url();
  tenant.cover_url = faker.image.url();
  return tenant;
});
