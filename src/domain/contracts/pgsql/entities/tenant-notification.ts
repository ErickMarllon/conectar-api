import { PgsqlTenant } from './tenant';

export class PgsqlTenantNotificationSetting {
  id: string;
  tenant: PgsqlTenant;
  is_active: boolean;
  is_email: boolean;
  is_sms: boolean;
  is_push: boolean;
  is_whatsapp: boolean;
  notify_new_user: boolean;
  notify_new_order: boolean;
  notify_order_status: boolean;
  notify_payment_received: boolean;
  notify_invoice_created: boolean;
  notify_service_schedule_status: boolean;
  notify_service_schedule_reminder: boolean;
  notify_low_stock: boolean;
  notify_referral_reward: boolean;
  notify_marketing_event: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlTenantNotificationSetting) {
    Object.assign(this, input);
  }
}
