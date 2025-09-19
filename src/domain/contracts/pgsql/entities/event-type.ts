import { PgsqlNotificationEvent } from './notification-event';

export class PgsqlEventType {
  id: string;
  code: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  notificationEvents: PgsqlNotificationEvent[];

  constructor(input: PgsqlEventType) {
    Object.assign(this, input);
  }
}
