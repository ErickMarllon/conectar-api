import { DeliveryMethod, ValueType } from '@/shared/enums';
import { PgsqlCategory } from './category';
import { PgsqlMedia } from './media';
import { PgsqlServiceSchedule } from './service-schedule';
import { PgsqlTenant } from './tenant';

export class PgsqlService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: PgsqlCategory;
  discount_type: ValueType;
  discount_value: number;
  DeliveryMethod: DeliveryMethod;
  tenant: PgsqlTenant;
  images: PgsqlMedia[];
  schedules: PgsqlServiceSchedule[];
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlService) {
    Object.assign(this, input);
  }
}
