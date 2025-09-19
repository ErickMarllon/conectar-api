import { PgsqlUser } from './user';

export class PgsqlRole {
  id: string;
  name: string;
  description: string;
  users: PgsqlUser[];
  created_at: Date;
  updated_at: Date;

  constructor(input: Partial<PgsqlRole>) {
    Object.assign(this, input);
  }
}
