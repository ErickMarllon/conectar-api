import { GatewayProvider, GatewayStatus } from '@/shared/enums';
import { PgsqlTenant } from './tenant';

export class PgsqlGatewaySetting {
  id: string;
  tenant: PgsqlTenant;
  provider: GatewayProvider;
  api_key: string;
  status: GatewayStatus;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlGatewaySetting) {
    Object.assign(this, input);
  }
}
