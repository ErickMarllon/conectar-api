import { setSeederFactory } from 'typeorm-extension';
import { PgsqlTenantSocialM } from '../../entities';

export const TenantSocialFactory = setSeederFactory(
  PgsqlTenantSocialM,
  (faker) => {
    const tenantSocial = new PgsqlTenantSocialM();

    tenantSocial.provider_facebook = faker.internet.url();
    tenantSocial.provider_instagram = faker.internet.url();
    tenantSocial.provider_linkedin = faker.internet.url();
    tenantSocial.provider_twitter = faker.internet.url();
    tenantSocial.created_at = new Date();
    tenantSocial.updated_at = new Date();

    return tenantSocial;
  },
);
