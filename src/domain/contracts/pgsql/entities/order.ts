import {
  DeliveryMethod,
  PaymentMethod,
  ServiceScheduleStatus,
  ValueType,
} from '@/shared/enums';
import { PgsqlOrderItem } from './order-item';
import { PgsqlTenant } from './tenant';
import { PgsqlUser } from './user';

export class PgsqlOrder {
  id: string;
  tenant: PgsqlTenant;
  tenant_id: string;
  user: PgsqlUser;
  user_id: string;
  type: string;
  total_price: number;
  discount_type: ValueType;
  discount_value: number;
  PaymentMethod: PaymentMethod;
  DeliveryMethod: DeliveryMethod;
  status: ServiceScheduleStatus;
  items: PgsqlOrderItem[];
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlOrder) {
    Object.assign(this, input);
  }
}
