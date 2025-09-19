import { setSeederFactory } from 'typeorm-extension';
import { PgsqlTenantNotificationSettingM } from '../../entities';

export const TenantNotificationSettingFactory = setSeederFactory(
  PgsqlTenantNotificationSettingM,
  async (faker) => {
    const setting = new PgsqlTenantNotificationSettingM();

    setting.is_active = true;
    setting.is_email = faker.datatype.boolean();
    setting.is_sms = faker.datatype.boolean();
    setting.is_push = faker.datatype.boolean();
    setting.is_whatsapp = faker.datatype.boolean();

    setting.notify_new_user = faker.datatype.boolean();
    setting.notify_new_order = faker.datatype.boolean();
    setting.notify_order_status = faker.datatype.boolean();
    setting.notify_payment_received = faker.datatype.boolean();
    setting.notify_invoice_created = faker.datatype.boolean();
    setting.notify_service_schedule_status = faker.datatype.boolean();
    setting.notify_service_schedule_reminder = faker.datatype.boolean();
    setting.notify_low_stock = faker.datatype.boolean();
    setting.notify_referral_reward = faker.datatype.boolean();
    setting.notify_marketing_event = faker.datatype.boolean();

    return setting;
  },
);
