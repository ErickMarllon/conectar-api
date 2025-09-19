import { UserStatus } from '@/shared/enums';
import { PgsqlAddress } from './address';
import { PgsqlNotificationEvent } from './notification-event';
import { PgsqlProductReview } from './product-review';
import { PgsqlRole } from './role';
import { PgsqlServiceSchedule } from './service-schedule';
import { PgsqlSession } from './session';
import { PgsqlTenant } from './tenant';
import { PgsqlUserSocial } from './user-social';

export class PgsqlUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  cpf_cnpj: string;
  avatar_url?: string;
  password?: string;
  role: PgsqlRole;
  tenant: PgsqlTenant;
  status: UserStatus;
  is_verified: boolean;
  last_login_at: Date;
  created_at: Date;
  updated_at: Date;
  sessions: PgsqlSession[];
  addresses: PgsqlAddress[];
  social: PgsqlUserSocial;
  notificationEvents: PgsqlNotificationEvent[];
  reviews: PgsqlProductReview[];
  serviceSchedules: PgsqlServiceSchedule[];

  constructor(input: PgsqlUser) {
    Object.assign(this, input);
  }
}
