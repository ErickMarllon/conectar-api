import { GatewayProvider, PaymentStatus } from '@/shared/enums';
import { PgsqlInvoice } from './invoice';
import { PgsqlTenant } from './tenant';

export class PgsqlPayment {
  id: string;
  tenant: PgsqlTenant;
  tenant_id: string;
  invoice: PgsqlInvoice;
  invoice_id: string;
  service_schedule_id?: string;
  gateway: GatewayProvider;
  status: PaymentStatus;
  amount: number;
  paid_at: Date;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlPayment) {
    Object.assign(this, input);
  }
}
