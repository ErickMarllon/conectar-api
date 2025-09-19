import { TenantStatus } from '@/shared/enums';
import { PgsqlPlan } from './plan';
import { PgsqlTenant } from './tenant';

export class PgsqlTenantSubscription {
  id: string;
  tenant: PgsqlTenant;
  plan: PgsqlPlan;
  amount_paid: number;
  start_date: Date;
  end_date: Date;
  paid_at: Date;
  status: TenantStatus;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlTenantSubscription) {
    Object.assign(this, input);
  }
}
