import { PgsqlTenant } from './tenant';
import { PgsqlUser } from './user';

export class PgsqlSession {
  id: string;
  user: PgsqlUser;
  user_id: string;
  tenant_id: string;
  tenant: PgsqlTenant;
  source: string;
  source_id: string;
  access_token?: string;
  refresh_token?: string;
  access_token_expires?: number;
  refresh_token_expires?: number;
  ip_address: string;
  user_agent: string;
  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlSession) {
    Object.assign(this, input);
  }
}
