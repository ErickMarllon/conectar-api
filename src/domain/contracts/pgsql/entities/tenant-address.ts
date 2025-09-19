import { PgsqlTenant } from './tenant';

export class PgsqlTenantAddress {
  id: string;
  tenant: PgsqlTenant;
  zip_code: string;
  street: string;
  street_number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  is_default: boolean;
  country: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlTenantAddress) {
    Object.assign(this, input);
  }
}
