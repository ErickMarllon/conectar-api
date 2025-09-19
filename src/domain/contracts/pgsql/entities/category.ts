import { PgsqlProduct } from './product';
import { PgsqlService } from './service';
import { PgsqlTenant } from './tenant';

export class PgsqlCategory {
  id: string;
  name: string;
  type: string;
  tenant: PgsqlTenant;
  products: PgsqlProduct[];
  services: PgsqlService[];
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlCategory) {
    Object.assign(this, input);
  }
}
