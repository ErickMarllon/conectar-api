import { PgsqlNotificationEventM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type INotificationEventRepository =
  AbstractRepoI<PgsqlNotificationEventM> & {};
