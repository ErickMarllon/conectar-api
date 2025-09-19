import { PgsqlUser } from './user';

export class PgsqlUserAddress {
  id: string;
  user: PgsqlUser;
  zip_code: string;
  street: string;
  street_number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlUserAddress) {
    Object.assign(this, input);
  }
}
