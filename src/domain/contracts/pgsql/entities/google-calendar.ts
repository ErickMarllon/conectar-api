import { ServiceScheduleStatus } from '@/shared/enums';
import { PgsqlServiceSchedule } from './service-schedule';

export class PgsqlGoogleCalendar {
  id: string;
  service_schedule: PgsqlServiceSchedule;
  service_schedule_id: string;
  google_event_id: string;
  synced_at: Date;
  status: ServiceScheduleStatus;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlGoogleCalendar) {
    Object.assign(this, input);
  }
}
