import { PlanInterval } from '@/shared/enums';
import { PgsqlTenant } from './tenant';
import { PgsqlTenantSubscription } from './tenant-subscription';

export class PgsqlPlan {
  id: string;
  name: string;
  interval: PlanInterval;
  max_users: number;
  max_products: number;
  max_services: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  tenants: PgsqlTenant[];
  subscriptions: PgsqlTenantSubscription[];

  constructor(input: PgsqlPlan) {
    Object.assign(this, input);
  }
}
