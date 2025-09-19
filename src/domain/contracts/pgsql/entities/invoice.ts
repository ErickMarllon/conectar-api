import { PgsqlOrder } from './order';
import { PgsqlTenant } from './tenant';

export class PgsqlInvoice {
  id: string;
  tenant: PgsqlTenant;
  order: PgsqlOrder;
  type: string;
  total: number;
  total_discount: number;
  details: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlInvoice) {
    Object.assign(this, input);
  }
}
