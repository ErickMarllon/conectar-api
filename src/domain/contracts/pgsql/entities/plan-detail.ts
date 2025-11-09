export class PgsqlPlanDetail {
  id: string;
  plan_id: string;
  price?: number;
  billing_period?: string;
  cta_label?: string;
  included_features?: string[];
  created_at: Date;
  updated_at: Date;
}
