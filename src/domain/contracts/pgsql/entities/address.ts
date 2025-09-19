import { PgsqlUser } from './user';

export class PgsqlAddress {
  id: string;
  user: PgsqlUser;
  zip_code: string;
  street: string;
  street_number: string;
  neighborhood: string;
  complement?: string | null;
  city: string;
  state: string;
  country: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlAddress) {
    Object.assign(this, input);
  }
}
