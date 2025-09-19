import { PgsqlTenant } from './tenant';

export class PgsqlTenantSocial {
  id: string;
  tenant: PgsqlTenant;
  provider_facebook: string;
  provider_instagram: string;
  provider_linkedin: string;
  provider_twitter: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlTenantSocial) {
    Object.assign(this, input);
  }
}
