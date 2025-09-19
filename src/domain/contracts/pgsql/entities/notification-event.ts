import { NotificationEventStatus } from '@/shared/enums';
import { PgsqlEventType } from './event-type';
import { PgsqlOrder } from './order';
import { PgsqlServiceSchedule } from './service-schedule';
import { PgsqlTenant } from './tenant';
import { PgsqlUser } from './user';

export class PgsqlNotificationEvent {
  id: string;
  tenant: PgsqlTenant;
  user: PgsqlUser;
  service_schedule: PgsqlServiceSchedule;
  order: PgsqlOrder;
  eventType: PgsqlEventType;
  status: NotificationEventStatus;
  scheduled_at: Date;
  sent_at: Date;
  message: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlNotificationEvent) {
    Object.assign(this, input);
  }
}
