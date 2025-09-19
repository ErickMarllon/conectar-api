import { TenantStatus } from '@/shared/enums';
import { PgsqlPlan } from './plan';
import { PgsqlTenant } from './tenant';

export class PgsqlTenantSubscriptiont {
  id: string;
  status: TenantStatus;
  start_date: Date;
  end_date: Date;
  amount_paid: number;
  paid_at: Date | null;
  tenant: PgsqlTenant;
  plan: PgsqlPlan;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlTenantSubscriptiont) {
    Object.assign(this, input);
  }
}
