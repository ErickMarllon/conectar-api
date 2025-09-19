import {
  PaymentStatus,
  ServiceScheduleStatus,
  ValueType,
} from '@/shared/enums';
import { PgsqlGoogleCalendar } from './google-calendar';
import { PgsqlService } from './service';
import { PgsqlTenant } from './tenant';
import { PgsqlUser } from './user';

export class PgsqlServiceSchedule {
  id: string;
  service_id: string;
  service: PgsqlService;
  user_id: string;
  user: PgsqlUser;
  tenant_id: string;
  tenant: PgsqlTenant;
  status: ServiceScheduleStatus;
  deposit_amount: number;
  total_amount: number;
  deposit_type: ValueType;
  deposit_status: PaymentStatus;
  notes: string;
  deposit_paid_at: Date;
  scheduled_at: Date;
  googleCalendar: PgsqlGoogleCalendar[];
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlServiceSchedule) {
    Object.assign(this, input);
  }
}
