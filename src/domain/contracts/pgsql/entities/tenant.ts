import { PgsqlCategory } from './category';
import { PgsqlPlan } from './plan';
import { PgsqlProduct } from './product';
import { PgsqlService } from './service';
import { PgsqlServiceSchedule } from './service-schedule';
import { PgsqlSession } from './session';
import { PgsqlTenantAddress } from './tenant-address';
import { PgsqlTenantNotificationSetting } from './tenant-notification';
import { PgsqlTenantSocial } from './tenant-social';
import { PgsqlTenantSubscription } from './tenant-subscription';
import { PgsqlUser } from './user';

export class PgsqlTenant {
  id: string;
  name: string;
  whatsapp: string;
  logo_url?: string;
  cover_url?: string;
  phone_number: string;
  plan: PgsqlPlan;
  status: string;
  slug: string;
  about?: string;
  enable_service_schedule: boolean;
  enable_google_calendar: boolean;
  created_at: Date;
  updated_at: Date;
  subscriptions: PgsqlTenantSubscription[];
  notificationSettings: PgsqlTenantNotificationSetting[];
  social: PgsqlTenantSocial;
  users: PgsqlUser[];
  sessions: PgsqlSession[];
  categories: PgsqlCategory[];
  services: PgsqlService[];
  products: PgsqlProduct[];
  serviceSchedules: PgsqlServiceSchedule[];
  addresses: PgsqlTenantAddress[];

  constructor(input: PgsqlTenant) {
    Object.assign(this, input);
  }
}
