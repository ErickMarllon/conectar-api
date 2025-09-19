import { setSeederFactory } from 'typeorm-extension';
import { PgsqlUserSocialM } from '../../entities';

export const UserSocialFactory = setSeederFactory(
  PgsqlUserSocialM,
  async (faker) => {
    const userSocial = new PgsqlUserSocialM();
    userSocial.provider_facebook = faker.internet.userName() + '_fb';
    userSocial.provider_instagram = faker.internet.userName() + '_ig';
    userSocial.provider_linkedin = faker.internet.userName() + '_ln';
    userSocial.provider_twitter = faker.internet.userName() + '_tw';
    userSocial.created_at = new Date();
    userSocial.updated_at = new Date();
    return userSocial;
  },
);
