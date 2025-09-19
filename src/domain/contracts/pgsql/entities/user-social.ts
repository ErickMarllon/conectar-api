import { PgsqlUser } from './user';

export class PgsqlUserSocial {
  id: string;
  user: PgsqlUser;
  provider_facebook: string;
  provider_instagram: string;
  provider_linkedin: string;
  provider_twitter: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlUserSocial) {
    Object.assign(this, input);
  }
}
