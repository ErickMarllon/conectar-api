import { PlanInterval } from '@/shared/enums';
import { PgsqlPlanDetail } from './plan-detail';
import { PgsqlPlanFeature } from './plan-feature';
import { PgsqlTenant } from './tenant';

export class PgsqlPlan {
  id: string;
  name: string;
  tier: string;
  max_users: number;
  max_products: number;
  max_services: number;
  interval: PlanInterval;
  description?: string;
  created_at: Date;
  updated_at: Date;

  tenants: PgsqlTenant[];
  details?: PgsqlPlanDetail;
  features?: PgsqlPlanFeature[];

  constructor(input: PgsqlPlan) {
    Object.assign(this, input);
  }
}
